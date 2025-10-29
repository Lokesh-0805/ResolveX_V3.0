import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data for demonstration
const trendData = [
  { date: "Jan", ph: 7.2, turbidity: 4.5, oxygen: 8.2, nitrate: 8.5 },
  { date: "Feb", ph: 7.1, turbidity: 5.2, oxygen: 7.8, nitrate: 9.2 },
  { date: "Mar", ph: 7.3, turbidity: 3.8, oxygen: 8.5, nitrate: 7.8 },
  { date: "Apr", ph: 7.0, turbidity: 6.1, oxygen: 7.2, nitrate: 11.5 },
  { date: "May", ph: 6.9, turbidity: 7.5, oxygen: 6.8, nitrate: 13.2 },
  { date: "Jun", ph: 7.1, turbidity: 6.8, oxygen: 7.4, nitrate: 12.1 },
];

const locationData = [
  { location: "River Bank A", ph: 7.2, turbidity: 4.5, oxygen: 8.2, safety: 85 },
  { location: "Industrial Area", ph: 6.5, turbidity: 8.2, oxygen: 5.8, safety: 45 },
  { location: "Residential Zone", ph: 7.5, turbidity: 2.1, oxygen: 9.1, safety: 95 },
  { location: "Lake Shore", ph: 7.3, turbidity: 3.5, oxygen: 8.5, safety: 88 },
  { location: "Well Site", ph: 7.0, turbidity: 5.2, oxygen: 7.2, safety: 72 },
];

const statusData = [
  { name: "Safe", value: 65, color: "hsl(var(--success))" },
  { name: "Caution", value: 25, color: "hsl(var(--warning))" },
  { name: "Unsafe", value: 10, color: "hsl(var(--destructive))" },
];

const parameterDistribution = [
  { parameter: "pH", average: 7.1, safe: 7.5, current: 6.9 },
  { parameter: "Turbidity", average: 5.3, safe: 5.0, current: 6.2 },
  { parameter: "Oxygen", average: 7.8, safe: 8.0, current: 7.2 },
  { parameter: "Nitrate", average: 10.2, safe: 10.0, current: 11.5 },
];

const WaterAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Water Quality Analytics</h2>
        <p className="text-muted-foreground">
          Comprehensive insights into water quality trends and safety metrics
        </p>
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="status">Status</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Water Quality Trends Over Time</CardTitle>
              <CardDescription>
                Monitor how key water parameters have changed over the past 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="ph"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="pH Level"
                  />
                  <Line
                    type="monotone"
                    dataKey="oxygen"
                    stroke="hsl(var(--secondary))"
                    strokeWidth={2}
                    name="Dissolved Oxygen"
                  />
                  <Line
                    type="monotone"
                    dataKey="turbidity"
                    stroke="hsl(var(--warning))"
                    strokeWidth={2}
                    name="Turbidity"
                  />
                  <Line
                    type="monotone"
                    dataKey="nitrate"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={2}
                    name="Nitrate"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Average pH</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">7.1</p>
                <p className="text-sm text-muted-foreground mt-1">Within safe range</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dissolved Oxygen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-secondary">7.7 mg/L</p>
                <p className="text-sm text-muted-foreground mt-1">Good levels</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Alert Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-destructive">3</p>
                <p className="text-sm text-muted-foreground mt-1">Last 30 days</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="locations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Location Comparison</CardTitle>
              <CardDescription>
                Compare water quality metrics across different monitoring locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={locationData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="location" className="text-muted-foreground" angle={-45} textAnchor="end" height={100} />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="safety"
                    stackId="1"
                    stroke="hsl(var(--success))"
                    fill="hsl(var(--success) / 0.6)"
                    name="Safety Score %"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parameters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Parameter Distribution Analysis</CardTitle>
              <CardDescription>
                Current readings compared to averages and safe thresholds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={parameterDistribution}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="parameter" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="safe" fill="hsl(var(--success))" name="Safe Threshold" />
                  <Bar dataKey="average" fill="hsl(var(--secondary))" name="6-Month Average" />
                  <Bar dataKey="current" fill="hsl(var(--warning))" name="Current Reading" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Water Safety Status Distribution</CardTitle>
                <CardDescription>
                  Overall safety classification across all monitored locations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                  <p className="font-semibold text-success mb-1">Improving Trend</p>
                  <p className="text-sm text-muted-foreground">
                    Overall water quality has improved by 12% in the past quarter
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <p className="font-semibold text-warning mb-1">Monitor Industrial Area</p>
                  <p className="text-sm text-muted-foreground">
                    Nitrate levels near industrial zones showing 30% spike
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="font-semibold text-destructive mb-1">Action Required</p>
                  <p className="text-sm text-muted-foreground">
                    3 locations require immediate attention due to unsafe readings
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WaterAnalytics;
