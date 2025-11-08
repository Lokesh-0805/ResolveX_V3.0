// src/components/VideoModal.tsx
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Video, StopCircle, RefreshCcw, Send } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
}

export const VideoModal = ({ isOpen, onClose, onCapture }: VideoModalProps) => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  // Reset all states when closing
  const handleClose = () => {
    setIsRecording(false);
    setRecordedChunks([]);
    setVideoPreview(null);
    setRecordedBlob(null);
    onClose();
  };

  const handleStartRecording = useCallback(() => {
    if (webcamRef.current && webcamRef.current.stream) {
      setIsRecording(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        (event) => {
          if (event.data.size > 0) {
            setRecordedChunks((prev) => [...prev, event.data]);
          }
        }
      );

      // MODIFIED 'stop' event listener
      mediaRecorderRef.current.addEventListener(
        "stop",
        () => {
          // Use functional update to get the latest state and reset it
          setRecordedChunks((prevChunks) => {
            const blob = new Blob(prevChunks, { type: "video/webm" });
            const url = URL.createObjectURL(blob);
            setVideoPreview(url); // Set other states from within
            setRecordedBlob(blob);
            
            return []; // Return the new state for recordedChunks
          });
        }
      );
      mediaRecorderRef.current.start();
    }
    // MODIFIED dependency array
  }, [webcamRef, setIsRecording, setRecordedChunks, setVideoPreview, setRecordedBlob]);

  const handleStopRecording = useCallback(() => {
    // ... (this function is unchanged)
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [mediaRecorderRef, isRecording]);

  // Use the captured video
  const handleUseVideo = () => {
    if (recordedBlob) {
      const file = new File([recordedBlob], `waste-report-${Date.now()}.webm`, {
        type: "video/webm",
      });
      onCapture(file);
      handleClose(); // Close after capturing
    }
  };

  // Reset/Retake video
  const handleRetake = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview); // Clean up old object URL
    }
    setVideoPreview(null);
    setRecordedBlob(null);
    setRecordedChunks([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Record Video (max 30s)</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video">
          {videoPreview ? (
            // Show video preview
            <video src={videoPreview} controls autoPlay className="w-full h-full" />
          ) : (
            // Show live feed
            <Webcam
              audio={true} // Enable audio for video
              ref={webcamRef}
              videoConstraints={{
                facingMode: "environment",
              }}
              className="w-full h-full"
            />
          )}
        </div>
        <DialogFooter className="p-6 pt-4 gap-2">
          {videoPreview ? (
            // Show Retake and Use Video buttons
            <>
              <Button variant="outline" onClick={handleRetake} className="w-full">
                <RefreshCcw className="mr-2 h-4 w-4" /> Retake
              </Button>
              <Button onClick={handleUseVideo} className="w-full">
                <Send className="mr-2 h-4 w-4" /> Use Video
              </Button>
            </>
          ) : (
            // Show Start/Stop Recording button
            <Button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              size="lg"
              className="w-full"
              variant={isRecording ? "destructive" : "default"}
            >
              {isRecording ? (
                <StopCircle className="mr-2 h-5 w-5 animate-pulse" />
              ) : (
                <Video className="mr-2 h-5 w-5" />
              )}
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};