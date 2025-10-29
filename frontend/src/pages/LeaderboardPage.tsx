import Header from "@/components/Header";
import Leaderboard from "@/components/Leaderboard";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Award, Star, Target } from "lucide-react";

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Community Leaderboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Celebrating our environmental champions and their contributions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-md">
              <CardContent className="p-6 text-center">
                <Trophy className="h-12 w-12 text-accent mx-auto mb-4" />
                <p className="text-3xl font-bold text-foreground mb-2">1,250</p>
                <p className="text-sm text-muted-foreground">Top Score This Month</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <p className="text-3xl font-bold text-foreground mb-2">2,547</p>
                <p className="text-sm text-muted-foreground">Total Reports This Month</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 text-secondary mx-auto mb-4" />
                <p className="text-3xl font-bold text-foreground mb-2">876</p>
                <p className="text-sm text-muted-foreground">Water Tests Logged</p>
              </CardContent>
            </Card>
          </div>

          <Leaderboard />

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-accent" />
                  How to Earn Points
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">50</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Points per verified waste report</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">30</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Points per water quality test logged</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-accent">100</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Bonus for high-priority reports</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-accent" />
                  Available Badges
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <div className="text-2xl mb-1">🌱</div>
                    <p className="text-xs font-medium">Eco-Starter</p>
                    <p className="text-xs text-muted-foreground">5 reports</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <div className="text-2xl mb-1">🌿</div>
                    <p className="text-xs font-medium">Green Guardian</p>
                    <p className="text-xs text-muted-foreground">20 reports</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <div className="text-2xl mb-1">🌳</div>
                    <p className="text-xs font-medium">Eco-Champion</p>
                    <p className="text-xs text-muted-foreground">50 reports</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50 text-center">
                    <div className="text-2xl mb-1">💧</div>
                    <p className="text-xs font-medium">Water Warrior</p>
                    <p className="text-xs text-muted-foreground">30 tests</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
