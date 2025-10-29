import { useState } from "react";
import { Droplet, MapPin, AlertTriangle, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import WaterAnalytics from "@/components/WaterAnalytics";
import WaterQualityHeatMap from "@/components/WaterQualityHeatMap";

const WaterTesting = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Water Test Data Logged!",
      description: "Your water quality data has been recorded and will be analyzed.",
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Water Quality Monitoring
            </h1>
            <p className="text-lg text-muted-foreground">
              Log water test results to help monitor and protect your community's water sources
            </p>
          </div>

          <Tabs defaultValue="log-data" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="log-data">Log Data</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="heatmap">Heat Map</TabsTrigger>
            </TabsList>

            <TabsContent value="log-data" className="space-y-8">
              <div className="max-w-4xl mx-auto">

          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="text-2xl">Digital Input Dashboard</CardTitle>
              <CardDescription>
                Enter readings from your water testing kit or IoT sensors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-base font-semibold">
                    Testing Location <span className="text-destructive">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      placeholder="e.g., River Bank near Industrial Area"
                      className="flex-1"
                      required
                    />
                    <Button type="button" variant="outline" onClick={getCurrentLocation}>
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Water Source */}
                <div className="space-y-2">
                  <Label htmlFor="source" className="text-base font-semibold">
                    Water Source Type <span className="text-destructive">*</span>
                  </Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select water source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="river">River</SelectItem>
                      <SelectItem value="lake">Lake</SelectItem>
                      <SelectItem value="groundwater">Groundwater/Well</SelectItem>
                      <SelectItem value="tap">Tap Water</SelectItem>
                      <SelectItem value="industrial">Industrial Discharge</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Test Parameters Grid */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Test Parameters</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* pH Level */}
                    <div className="space-y-2">
                      <Label htmlFor="ph">
                        pH Level <span className="text-muted-foreground text-sm">(0-14)</span>
                      </Label>
                      <Input
                        id="ph"
                        type="number"
                        step="0.1"
                        min="0"
                        max="14"
                        placeholder="e.g., 7.2"
                      />
                    </div>

                    {/* Turbidity */}
                    <div className="space-y-2">
                      <Label htmlFor="turbidity">
                        Turbidity <span className="text-muted-foreground text-sm">(NTU)</span>
                      </Label>
                      <Input
                        id="turbidity"
                        type="number"
                        step="0.1"
                        placeholder="e.g., 5.0"
                      />
                    </div>

                    {/* Dissolved Oxygen */}
                    <div className="space-y-2">
                      <Label htmlFor="oxygen">
                        Dissolved Oxygen <span className="text-muted-foreground text-sm">(mg/L)</span>
                      </Label>
                      <Input
                        id="oxygen"
                        type="number"
                        step="0.1"
                        placeholder="e.g., 8.5"
                      />
                    </div>

                    {/* Temperature */}
                    <div className="space-y-2">
                      <Label htmlFor="temperature">
                        Temperature <span className="text-muted-foreground text-sm">(°C)</span>
                      </Label>
                      <Input
                        id="temperature"
                        type="number"
                        step="0.1"
                        placeholder="e.g., 25.0"
                      />
                    </div>

                    {/* Nitrate */}
                    <div className="space-y-2">
                      <Label htmlFor="nitrate">
                        Nitrate <span className="text-muted-foreground text-sm">(mg/L)</span>
                      </Label>
                      <Input
                        id="nitrate"
                        type="number"
                        step="0.1"
                        placeholder="e.g., 10.0"
                      />
                    </div>

                    {/* Coliform */}
                    <div className="space-y-2">
                      <Label htmlFor="coliform">
                        Coliform Presence
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="absent">Absent</SelectItem>
                          <SelectItem value="present">Present</SelectItem>
                          <SelectItem value="high">High Levels</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* IoT Sensor Info */}
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 flex items-start gap-3">
                  <Droplet className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-secondary-foreground mb-1">IoT Sensor Integration</p>
                    <p className="text-muted-foreground">
                      Have IoT sensors? Connect them to automatically sync real-time water quality data
                      with our platform for continuous monitoring.
                    </p>
                  </div>
                </div>

                {/* Alert Notification */}
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-accent-foreground mb-1">Automatic Alerts</p>
                    <p className="text-muted-foreground">
                      If readings indicate unsafe water quality, SMS/email alerts will be sent to
                      registered citizens and local authorities automatically.
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" size="lg" className="w-full" variant="secondary">
                  Log Water Test Data
                </Button>
              </form>
            </CardContent>
          </Card>

              {/* Water Quality Guidelines */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Water Quality Guidelines</CardTitle>
                  <CardDescription>Reference values for safe drinking water</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="font-semibold text-foreground mb-1">pH Level</p>
                      <p className="text-sm text-muted-foreground">Safe: 6.5 - 8.5</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="font-semibold text-foreground mb-1">Turbidity</p>
                      <p className="text-sm text-muted-foreground">Safe: &lt; 5 NTU</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="font-semibold text-foreground mb-1">Dissolved Oxygen</p>
                      <p className="text-sm text-muted-foreground">Safe: &gt; 6 mg/L</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="font-semibold text-foreground mb-1">Nitrate</p>
                      <p className="text-sm text-muted-foreground">Safe: &lt; 10 mg/L</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="font-semibold text-foreground mb-1">Coliform</p>
                      <p className="text-sm text-muted-foreground">Safe: Absent</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="font-semibold text-foreground mb-1">Temperature</p>
                      <p className="text-sm text-muted-foreground">Normal: 20-30°C</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <WaterAnalytics />
            </TabsContent>

            <TabsContent value="heatmap">
              <WaterQualityHeatMap />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default WaterTesting;
