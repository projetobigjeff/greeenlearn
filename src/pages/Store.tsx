
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import StoreRewardList from "@/components/store/StoreRewardList";
import MyRewards from "@/components/store/MyRewards";
import { useToast } from "@/hooks/use-toast";

// Reward interface
export interface Reward {
  id: string;
  name: string;
  description: string;
  category: "symbolic" | "social" | "physical";
  points: number;
  imageUrl: string;
  available: boolean;
}

const Store = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock user data for current points
  const [userData] = useState({
    points: 580
  });

  // Mock rewards data
  const [rewards] = useState<Reward[]>([
    {
      id: "r1",
      name: "Certificado Digital de Guardião do Meio Ambiente",
      description: "Certificado oficial reconhecendo suas contribuições para a preservação ambiental",
      category: "symbolic",
      points: 100,
      imageUrl: "certificado-digital",
      available: true
    },
    {
      id: "r2",
      name: "Avatar Premium Especial",
      description: "Desbloqueie um avatar exclusivo de protetor da natureza para seu perfil",
      category: "symbolic",
      points: 50,
      imageUrl: "avatar-premium",
      available: true
    },
    {
      id: "r3",
      name: "Escolher o Próximo Desafio da Turma",
      description: "Você terá a chance de propor e escolher o próximo desafio ambiental para toda a turma",
      category: "social",
      points: 200,
      imageUrl: "escolher-desafio",
      available: true
    },
    {
      id: "r4",
      name: "Participar de Ação Ambiental Especial",
      description: "Vaga garantida na próxima expedição ambiental organizada pela escola",
      category: "social",
      points: 250,
      imageUrl: "acao-ambiental",
      available: true
    },
    {
      id: "r5",
      name: "Squeeze Ecológico",
      description: "Garrafa reutilizável feita de materiais recicláveis para reduzir o uso de plástico",
      category: "physical",
      points: 350,
      imageUrl: "squeeze",
      available: true
    },
    {
      id: "r6",
      name: "Muda de Planta Nativa",
      description: "Receba uma muda de árvore nativa para plantar e acompanhar seu crescimento",
      category: "physical",
      points: 300,
      imageUrl: "muda-planta",
      available: true
    },
    {
      id: "r7",
      name: "Kit Escolar Reciclável",
      description: "Kit completo de material escolar feito com materiais sustentáveis",
      category: "physical",
      points: 400,
      imageUrl: "kit-escolar",
      available: true
    },
  ]);

  // Mock claimed rewards
  const [claimedRewards, setClaimedRewards] = useState<Reward[]>([]);

  // Function to handle reward redemption
  const handleRedeemReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    
    if (reward && userData.points >= reward.points) {
      setClaimedRewards(prev => [...prev, reward]);
      
      toast({
        title: "Recompensa Resgatada!",
        description: `Você resgatou "${reward.name}". O professor será notificado para aprovação.`,
        duration: 5000,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Loja Verde</h1>
        <div className="flex items-center mt-4 md:mt-0">
          <div className="bg-primary/10 px-4 py-2 rounded-md flex items-center">
            <span className="mr-2 font-medium">Seus pontos:</span>
            <span className="text-lg font-bold text-primary">{userData.points}</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="store">
        <TabsList className="w-full grid grid-cols-2 mb-6">
          <TabsTrigger value="store">Loja de Recompensas</TabsTrigger>
          <TabsTrigger value="my-rewards">Minhas Recompensas</TabsTrigger>
        </TabsList>

        <TabsContent value="store">
          <div className="space-y-6">
            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar recompensas..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Reward categories */}
            <StoreRewardList 
              rewards={rewards} 
              searchQuery={searchQuery} 
              userPoints={userData.points}
              onRedeem={handleRedeemReward}
            />
          </div>
        </TabsContent>

        <TabsContent value="my-rewards">
          <MyRewards claimedRewards={claimedRewards} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Store;
