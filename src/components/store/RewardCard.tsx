
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Reward } from "@/pages/Store";

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  onRedeem: (rewardId: string) => void;
}

const RewardCard = ({ reward, userPoints, onRedeem }: RewardCardProps) => {
  const canRedeem = userPoints >= reward.points;
  
  const getCategoryBadge = () => {
    switch(reward.category) {
      case "symbolic":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Simbólica</Badge>;
      case "social":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Social</Badge>;
      case "physical":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Física</Badge>;
    }
  };
  
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-all">
      <CardHeader className="p-0 overflow-hidden rounded-t-lg">
        <div className="aspect-video w-full bg-muted flex items-center justify-center p-4 relative">
          <div className="text-center">
            <h3 className="font-medium text-lg">{reward.name}</h3>
            <p className="text-sm text-muted-foreground">Recompensa {reward.category}</p>
          </div>
          <div className="absolute top-2 left-2">
            {getCategoryBadge()}
          </div>
          <div className="absolute bottom-2 right-2 bg-black/70 text-white rounded-full px-3 py-1 text-sm flex items-center">
            <Star className="h-3.5 w-3.5 mr-1 text-amber-400" fill="currentColor" />
            <span>{reward.points}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 flex-grow">
        <h3 className="font-medium text-lg mb-2">{reward.name}</h3>
        <p className="text-sm text-muted-foreground">{reward.description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          className="w-full"
          disabled={!canRedeem}
          onClick={() => onRedeem(reward.id)}
        >
          {canRedeem ? 'Resgatar' : `Precisa de ${reward.points} pontos`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RewardCard;
