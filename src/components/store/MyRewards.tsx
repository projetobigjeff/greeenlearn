
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { Reward } from "@/pages/Store";

interface MyRewardsProps {
  claimedRewards: Reward[];
}

const MyRewards = ({ claimedRewards }: MyRewardsProps) => {
  if (claimedRewards.length === 0) {
    return (
      <Card className="mt-6">
        <CardContent className="py-10 text-center">
          <p className="text-muted-foreground">Você ainda não resgatou nenhuma recompensa.</p>
          <p className="text-muted-foreground mt-2">Visite a loja para resgatar recompensas com seus pontos!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {claimedRewards.map((reward) => (
          <Card key={reward.id} className="flex">
            <div className="w-1/3 bg-muted flex items-center justify-center">
              <div className="text-center p-2">
                <div className="font-medium">{reward.name}</div>
                <div className="text-xs text-muted-foreground">{reward.category}</div>
              </div>
            </div>
            <div className="w-2/3">
              <CardHeader>
                <div className="flex justify-between items-start mb-1">
                  <CardTitle className="text-lg">{reward.name}</CardTitle>
                </div>
                <Badge className="mb-2">Aguardando aprovação</Badge>
                <p className="text-sm text-muted-foreground">{reward.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>Resgatado {new Date().toLocaleDateString()}</span>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyRewards;
