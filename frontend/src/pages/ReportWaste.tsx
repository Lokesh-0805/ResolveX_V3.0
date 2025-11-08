import { useState, ChangeEvent, useEffect } from "react"; // MODIFIED
import { Camera, MapPin, Upload, AlertCircle, Loader2, Video, XCircle } from "lucide-react"; // MODIFIED
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import { CameraModal } from "@/components/CameraModal";
import { VideoModal } from "@/components/VideoModal"; // ADDED: Import new video modal

const ReportWaste = () => {
  const { toast } = useToast();

  // MODIFIED: State to handle multiple files and previews
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  
  const [location, setLocation] = useState<string>("");
  const [wasteType, setWasteType] = useState<string>("");
  const [landmark, setLandmark] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  
  // MODIFIED: State for both modals
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // ADDED: Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    // This is a cleanup function that runs when the component unmounts
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  // (SIMULATION) Replicates an AI backend call.
  const analyzeImage = (file: File): Promise<{ type: string }> => {
    // ... (unchanged)
    console.log("Simulating AI analysis for:", file.name);
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockTypes = ["biomedical", "plastic", "ewaste", "organic", "construction"];
        const randomType = mockTypes[Math.floor(Math.random() * mockTypes.length)];
        console.log("AI result:", randomType);
        toast({
          title: "AI Analysis Complete",
          description: `Detected waste type: ${randomType}`,
        });
        resolve({ type: randomType });
      }, 1500);
    });
  };

  // Fetches location and sets it in state
  const getCurrentLocation = () => {
    // ... (unchanged)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(4);
          const long = position.coords.longitude.toFixed(4);
          const locationString = `Lat: ${lat}, Long: ${long}`;
          setLocation(locationString);
          toast({
            title: "Location Captured",
            description: locationString,
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    }
  };
  
  // ADDED: Reusable function to run analysis
  const runAnalysis = async (analysisFile: File) => {
    // Only run if this is the first file
    if (files.length > 0) return;

    setIsAnalyzing(true);
    // 1. Automatically get location
    getCurrentLocation();

    // 2. (Mock) Analyze image and set waste type
    try {
      const aiResult = await analyzeImage(analysisFile);
      setWasteType(aiResult.type);
    } catch (error) {
      console.error("AI Analysis Error:", error);
      toast({
        title: "AI Error",
        description: "Could not analyze image. Please select type manually.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // ADDED: Reusable function to add files to state
  const addFilesToReport = (newFiles: File[]) => {
    const newPreviews = newFiles.map(file => URL.createObjectURL(file));

    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    
    // Find the first image in the new files to run analysis
    const firstImage = newFiles.find(f => f.type.startsWith("image/"));
    if (firstImage && files.length === 0) { // Only analyze if no files existed before
      runAnalysis(firstImage);
    } else if (files.length === 0 && newFiles.length > 0) {
      // If no image, run analysis on first file (e.g., video)
      // Your AI backend might need to handle this
      // runAnalysis(newFiles[0]);
      
      // For now, let's only run AI on images.
      // If you want location on video, just call:
      if (files.length === 0) getCurrentLocation();
    }
  };

  // ADDED: Function to remove a file
  const removeFile = (indexToRemove: number) => {
    // Revoke the object URL to free memory
    const previewToRemove = previews[indexToRemove];
    URL.revokeObjectURL(previewToRemove);

    setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
    setPreviews(prevPreviews => prevPreviews.filter((_, index) => index !== indexToRemove));
  };
  
  // MODIFIED: Handles file input, now accepts multiple
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (uploadedFiles) {
      addFilesToReport(Array.from(uploadedFiles));
    }
  };

  // MODIFIED: Handles photo from camera modal
  const handleCapture = (file: File) => {
    addFilesToReport([file]);
    setIsCameraOpen(false); // Close modal on capture
  };

  // ADDED: Handles video from video modal
  const handleVideoCapture = (file: File) => {
    addFilesToReport([file]);
    setIsVideoModalOpen(false); // Close modal on capture
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", {
      files,
      location,
      wasteType,
      landmark,
      description
    });
    toast({
      title: "Report Submitted Successfully!",
      description: "Your waste report has been submitted and will be reviewed shortly.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* ... (Header text unchanged) ... */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Report a Waste Issue
            </h1>
            <p className="text-lg text-muted-foreground">
              Help keep our community clean by reporting waste issues in your area
            </p>
          </div>
          
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="text-2xl">Smart Waste Reporting Form</CardTitle>
              <CardDescription>
                Add photos or a video. Our AI will analyze the first image and tag the location.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <fieldset disabled={isAnalyzing} className="space-y-6 group">
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">
                      Media (Photos/Video) <span className="text-destructive">*</span>
                    </Label>
                    
                    {/* ADDED: Preview Gallery */}
                    {previews.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {previews.map((previewUrl, index) => {
                          const file = files[index];
                          return (
                            <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                              {file.type.startsWith("image/") ? (
                                <img
                                  src={previewUrl}
                                  alt={`Preview ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <video
                                  src={previewUrl}
                                  controls
                                  className="w-full h-full object-cover"
                                />
                              )}
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-1 right-1 h-6 w-6 rounded-full"
                                onClick={() => removeFile(index)}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* MODIFIED: Media Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="h-auto p-6 flex-col gap-2"
                        onClick={() => setIsCameraOpen(true)}
                        disabled={isAnalyzing}
                      >
                        <Camera className="h-10 w-10 text-primary" />
                        <span className="font-medium">Take Photo</span>
                      </Button>
                      
                      <Button
                        type="button"
                        variant="outline"
                        className="h-auto p-6 flex-col gap-2"
                        onClick={() => setIsVideoModalOpen(true)} // ADDED
                        disabled={isAnalyzing}
                      >
                        <Video className="h-10 w-10 text-primary" />
                        <span className="font-medium">Record Video</span>
                      </Button>
                      
                      <label
                        htmlFor="file-upload"
                        className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-base cursor-pointer flex flex-col items-center justify-center gap-2"
                      >
                        {isAnalyzing ? (
                          <Loader2 className="h-10 w-10 text-primary animate-spin" />
                        ) : (
                          <Upload className="h-10 w-10 text-muted-foreground" />
                        )}
                        <span className="font-medium">Upload Files</span>
                      </label>
                      <input
                        type="file"
                        id="file-upload"
                        accept="image/*,video/*" // MODIFIED
                        multiple // MODIFIED
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={isAnalyzing}
                      />
                    </div>
                  </div>

                  {/* ... (Rest of the form fields: Waste Type, Location, etc. are unchanged) ... */}
                  {/* ... (They will be disabled by the <fieldset> when isAnalyzing is true) ... */}

                  {/* Waste Type */}
                  <div className="space-y-2">
                    <Label htmlFor="wasteType" className="text-base font-semibold">
                      Waste Type <span className="text-muted-foreground text-sm">(Auto-detected)</span>
                    </Label>
                    <Select onValueChange={setWasteType} value={wasteType} disabled={isAnalyzing}>
                      <SelectTrigger>
                        <SelectValue placeholder="AI will select waste category..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="biomedical">Biomedical Waste</SelectItem>
                        <SelectItem value="plastic">Plastic Waste</SelectItem>
                        <SelectItem value="organic">Organic Waste</SelectItem>
                        <SelectItem value="ewaste">E-Waste</SelectItem>
                        <SelectItem value="general">General Waste</SelectItem>
                        <SelectItem value="construction">Construction Debris</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-base font-semibold">
                      Location <span className="text-muted-foreground text-sm">(GPS Auto-tagged)</span>
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="location"
                        placeholder="Location will be auto-filled..."
                        className="flex-1"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        disabled={isAnalyzing}
                      />
                      <Button type="button" variant="outline" onClick={getCurrentLocation} disabled={isAnalyzing}>
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Landmark */}
                  <div className="space-y-2">
                    <Label htmlFor="landmark" className="text-base font-semibold">
                      Nearest Landmark
                    </Label>
                    <Input
                      id="landmark"
                      placeholder="e.g., Near City Park, Main Gate"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      disabled={isAnalyzing}
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-base font-semibold">
                      Additional Details <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the issue in detail..."
                      rows={4}
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      disabled={isAnalyzing}
                    />
                  </div>
                </fieldset>
                
                {/* ... (Priority Alert unchanged) ... */}
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-accent-foreground mb-1">AI Priority Detection</p>
                    <p className="text-muted-foreground">
                      High-priority reports (biomedical, hazardous) will be automatically escalated
                      to authorities
                    </p>
                  </div>
                </div>

                {/* ... (Submit Button unchanged) ... */}
                <Button type="submit" size="lg" className="w-full" variant="hero" disabled={isAnalyzing || files.length === 0}>
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Submit Report"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* ... (Info Cards unchanged) ... */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Track Your Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  All your submissions are tracked like a ticketing system. Check status anytime in your dashboard.
                </p>
                <Button variant="outline" className="w-full">View My Reports</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Earn Eco-Points</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Each verified report earns you points and badges. Climb the leaderboard and unlock rewards!
                </p>
                <Button variant="outline" className="w-full">View Leaderboard</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* MODIFIED: Render both modals */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCapture}
      />
      
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onCapture={handleVideoCapture}
      />
    </div>
  );
};

export default ReportWaste;