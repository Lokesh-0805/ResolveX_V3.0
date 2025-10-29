import { CheckCircle2, MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const recentReports = [
  {
    id: 1,
    type: "Plastic Waste",
    location: "MG Road, Sector 14",
    date: "2 hours ago",
    status: "Resolved",
    reporter: "Priya S."
  },
  {
    id: 2,
    type: "Biomedical Waste",
    location: "Hospital Area, Block C",
    date: "5 hours ago",
    status: "Resolved",
    reporter: "Rajesh K."
  },
  {
    id: 3,
    type: "E-Waste",
    location: "Tech Park, Zone 3",
    date: "1 day ago",
    status: "Resolved",
    reporter: "Anita P."
  },
];

const RecentReports = () => {
  return (
    <Card className="shadow-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <CheckCircle2 className="h-6 w-6 text-primary" />
          Recent Resolved Reports
        </CardTitle>
        <p className="text-sm text-muted-foreground">Community action in progress</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentReports.map((report) => (
            <div
              key={report.id}
              className="flex flex-col gap-2 p-4 rounded-lg border border-border bg-card hover:shadow-md transition-base"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="font-medium">
                      {report.type}
                    </Badge>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                      {report.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <MapPin className="h-4 w-4" />
                    {report.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {report.date} • Reported by {report.reporter}
                  </div>
                </div>
                <CheckCircle2 className="h-8 w-8 text-primary flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentReports;
