import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Droplet, AlertTriangle, CheckCircle } from "lucide-react";

// Mock heatmap data
const heatmapLocations = [
  {
    id: 1,
    name: "River Bank - North",
    lat: 28.6139,
    lng: 77.2090,
    status: "safe",
    ph: 7.2,
    turbidity: 3.5,
    oxygen: 8.5,
    lastTested: "2 hours ago",
  },
  {
    id: 2,
    name: "Industrial Area - East",
    lat: 28.6289,
    lng: 77.2195,
    status: "unsafe",
    ph: 6.2,
    turbidity: 12.5,
    oxygen: 4.2,
    lastTested: "1 hour ago",
  },
  {
    id: 3,
    name: "Residential Zone - Central",
    lat: 28.6089,
    lng: 77.2050,
    status: "safe",
    ph: 7.5,
    turbidity: 2.1,
    oxygen: 9.1,
    lastTested: "30 mins ago",
  },
  {
    id: 4,
    name: "Lake Shore - West",
    lat: 28.6189,
    lng: 77.1990,
    status: "caution",
    ph: 6.8,
    turbidity: 6.5,
    oxygen: 6.8,
    lastTested: "3 hours ago",
  },
  {
    id: 5,
    name: "Well Site - South",
    lat: 28.5989,
    lng: 77.2140,
    status: "safe",
    ph: 7.3,
    turbidity: 4.2,
    oxygen: 8.0,
    lastTested: "1 hour ago",
  },
  {
    id: 6,
    name: "Agricultural Area",
    lat: 28.6339,
    lng: 77.2240,
    status: "caution",
    ph: 7.0,
    turbidity: 5.8,
    oxygen: 7.2,
    lastTested: "4 hours ago",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "safe":
      return "bg-success/20 border-success text-success";
    case "caution":
      return "bg-warning/20 border-warning text-warning";
    case "unsafe":
      return "bg-destructive/20 border-destructive text-destructive";
    default:
      return "bg-muted border-muted-foreground text-muted-foreground";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "safe":
      return <CheckCircle className="h-4 w-4" />;
    case "caution":
      return <AlertTriangle className="h-4 w-4" />;
    case "unsafe":
      return <Droplet className="h-4 w-4" />;
    default:
      return <MapPin className="h-4 w-4" />;
  }
};

const WaterQualityHeatMap = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Water Quality Heat Map</h2>
        <p className="text-muted-foreground">
          Real-time water safety status across monitored locations
        </p>
      </div>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Status Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm">Safe - All parameters within range</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <span className="text-sm">Caution - Some parameters elevated</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplet className="h-4 w-4 text-destructive" />
              <span className="text-sm">Unsafe - Immediate action required</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Heat Map Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {heatmapLocations.map((location) => (
          <Card
            key={location.id}
            className={`transition-all hover:shadow-lg border-2 ${
              location.status === "unsafe"
                ? "border-destructive/30"
                : location.status === "caution"
                ? "border-warning/30"
                : "border-success/30"
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <CardTitle className="text-lg">{location.name}</CardTitle>
                </div>
                <Badge
                  className={`${getStatusColor(location.status)} flex items-center gap-1`}
                >
                  {getStatusIcon(location.status)}
                  {location.status}
                </Badge>
              </div>
              <CardDescription>Last tested: {location.lastTested}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">pH Level:</span>
                  <span
                    className={`font-semibold ${
                      location.ph >= 6.5 && location.ph <= 8.5
                        ? "text-success"
                        : "text-warning"
                    }`}
                  >
                    {location.ph}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Turbidity:</span>
                  <span
                    className={`font-semibold ${
                      location.turbidity < 5 ? "text-success" : "text-warning"
                    }`}
                  >
                    {location.turbidity} NTU
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Dissolved O₂:</span>
                  <span
                    className={`font-semibold ${
                      location.oxygen > 6 ? "text-success" : "text-warning"
                    }`}
                  >
                    {location.oxygen} mg/L
                  </span>
                </div>
                <div className="text-xs text-muted-foreground pt-2 border-t">
                  Coordinates: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Total Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{heatmapLocations.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-success">Safe Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-success">
              {heatmapLocations.filter((l) => l.status === "safe").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-warning">Caution Zones</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-warning">
              {heatmapLocations.filter((l) => l.status === "caution").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-destructive">Unsafe Areas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-destructive">
              {heatmapLocations.filter((l) => l.status === "unsafe").length}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WaterQualityHeatMap;
