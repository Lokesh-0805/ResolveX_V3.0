import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, RefreshCcw } from "lucide-react";

// Helper function to convert base64 data URL to a File object
const dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr = dataurl.split(',');
  if (arr.length < 2) {
    throw new Error("Invalid data URL");
  }
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch || mimeMatch.length < 2) {
    throw new Error("Could not determine MIME type");
  }
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

// Define props for the modal
interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
}

export const CameraModal = ({ isOpen, onClose, onCapture }: CameraModalProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  // Capture a photo
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const capturedImageSrc = webcamRef.current.getScreenshot();
      setImageSrc(capturedImageSrc);
    }
  }, [webcamRef]);

  // Use the captured photo
  const handleUsePhoto = () => {
    if (imageSrc) {
      const file = dataURLtoFile(imageSrc, `waste-report-${Date.now()}.jpg`);
      onCapture(file);
      handleClose();
    }
  };

  // Reset/Retake photo
  const handleRetake = () => {
    setImageSrc(null);
  };

  // Reset component state on close
  const handleClose = () => {
    setImageSrc(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Take Photo</DialogTitle>
        </DialogHeader>
        <div className="relative">
          {imageSrc ? (
            // Show preview
            <img src={imageSrc} alt="Captured preview" className="w-full h-auto" />
          ) : (
            // Show live feed
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
              videoConstraints={{
                facingMode: "environment", // Prioritize rear camera
              }}
              className="w-full h-auto"
            />
          )}
        </div>
        <DialogFooter className="p-6 pt-4 gap-2">
          {imageSrc ? (
            // Show Retake and Use Photo buttons
            <>
              <Button variant="outline" onClick={handleRetake} className="w-full">
                <RefreshCcw className="mr-2 h-4 w-4" /> Retake
              </Button>
              <Button onClick={handleUsePhoto} className="w-full">
                Use Photo
              </Button>
            </>
          ) : (
            // Show Capture button
            <Button onClick={capture} size="lg" className="w-full">
              <Camera className="mr-2 h-5 w-5" /> Capture
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};