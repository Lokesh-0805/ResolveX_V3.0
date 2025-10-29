import { Trophy, Award, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const leaderboardData = [
  { rank: 1, name: "Priya Sharma", points: 1250, reports: 42, icon: Trophy, color: "text-accent" },
  { rank: 2, name: "Rajesh Kumar", points: 1100, reports: 38, icon: Award, color: "text-muted-foreground" },
  { rank: 3, name: "Anita Patel", points: 980, reports: 35, icon: Star, color: "text-muted-foreground" },
  { rank: 4, name: "Mohammed Ali", points: 875, reports: 31, icon: null, color: "" },
  { rank: 5, name: "Sunita Reddy", points: 820, reports: 28, icon: null, color: "" },
];

const Leaderboard = () => {
  return (
    <Card className="shadow-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Trophy className="h-6 w-6 text-primary" />
          Top Eco-Warriors
        </CardTitle>
        <p className="text-sm text-muted-foreground">Community champions making a difference</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboardData.map((user) => {
            const Icon = user.icon;
            return (
              <div
                key={user.rank}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-base"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    {Icon && (
                      <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                        <Icon className={`h-4 w-4 ${user.color}`} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.reports} reports</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">{user.points}</p>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
