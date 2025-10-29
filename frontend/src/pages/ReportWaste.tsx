import { useState } from "react";
import { Camera, MapPin, Upload, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const ReportWaste = () => {
  const { toast } = useToast();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Report Submitted Successfully!",
      description: "Your waste report has been submitted and will be reviewed shortly.",
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          toast({
            title: "Location Captured",
            description: `Lat: ${position.coords.latitude.toFixed(4)}, Long: ${position.coords.longitude.toFixed(4)}`,
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
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
                Upload a photo and our AI will automatically categorize the waste type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-base font-semibold">
                    Upload Photo <span className="text-destructive">*</span>
                  </Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-base cursor-pointer">
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="image" className="cursor-pointer">
                      {imagePreview ? (
                        <div className="space-y-4">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-h-64 mx-auto rounded-lg shadow-md"
                          />
                          <Button type="button" variant="outline" size="sm">
                            <Upload className="mr-2 h-4 w-4" />
                            Change Photo
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Camera className="h-16 w-16 text-muted-foreground mx-auto" />
                          <div>
                            <p className="text-lg font-medium text-foreground mb-2">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-sm text-muted-foreground">
                              AI will analyze and categorize the waste type
                            </p>
                          </div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Waste Type */}
                <div className="space-y-2">
                  <Label htmlFor="wasteType" className="text-base font-semibold">
                    Waste Type <span className="text-muted-foreground text-sm">(Auto-detected)</span>
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select waste category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="biomedical">Biomedical Waste</SelectItem>
                      <SelectItem value="plastic">Plastic Waste</SelectItem>
                      <SelectItem value="animal">Animal Waste</SelectItem>
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
                    />
                    <Button type="button" variant="outline" onClick={getCurrentLocation}>
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
                  />
                </div>

                {/* Priority Alert */}
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

                {/* Submit Button */}
                <Button type="submit" size="lg" className="w-full" variant="hero">
                  Submit Report
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info Cards */}
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
    </div>
  );
};

export default ReportWaste;
