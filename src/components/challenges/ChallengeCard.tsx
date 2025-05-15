
import { Leaf, Clock, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  dueDate?: string;
  isWeeklyChallenge?: boolean;
}

interface ChallengeCardProps {
  challenge: Challenge;
  onParticipate: (id: string) => void;
  featured?: boolean;
}

const difficultyMap = {
  easy: {
    label: 'Fácil',
    color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
  },
  medium: {
    label: 'Médio',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
  },
  hard: {
    label: 'Difícil',
    color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
  }
};

const ChallengeCard = ({ challenge, onParticipate, featured = false }: ChallengeCardProps) => {
  const {
    id,
    title,
    description,
    category,
    difficulty,
    points,
    dueDate,
    isWeeklyChallenge
  } = challenge;

  return (
    <Card className={`challenge-card ${featured ? 'border-primary' : ''}`}>
      <div className="relative h-36 bg-muted flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="text-2xl font-semibold mb-2">{title}</div>
          <div className="text-sm">{category}</div>
        </div>
        {isWeeklyChallenge && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-primary text-white font-medium">Desafio da Semana</Badge>
          </div>
        )}
      </div>
      <CardHeader>
        <div className="flex justify-between">
          <Badge variant="outline" className="eco-badge">
            {category}
          </Badge>
          <Badge 
            className={difficultyMap[difficulty].color}
          >
            {difficultyMap[difficulty].label}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-2">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <BarChart className="h-4 w-4 mr-1 text-primary" />
            <span>{points} pontos</span>
          </div>
          {dueDate && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-muted-foreground">{dueDate}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onParticipate(id)} 
          className="w-full"
          variant={featured ? "default" : "outline"}
        >
          Participar
          <Leaf className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;
