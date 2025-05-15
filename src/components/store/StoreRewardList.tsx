
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Leaf, Star, Package } from "lucide-react";
import RewardCard from "./RewardCard";
import { Reward } from "@/pages/Store";

interface StoreRewardListProps {
  rewards: Reward[];
  searchQuery: string;
  userPoints: number;
  onRedeem: (rewardId: string) => void;
}

const StoreRewardList = ({ rewards, searchQuery, userPoints, onRedeem }: StoreRewardListProps) => {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Filter rewards based on search query and category
  const filteredRewards = rewards.filter((reward) => {
    const matchesSearch = 
      reward.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      reward.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || reward.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Group rewards by category for section headers
  const getRewardsByCategory = (category: string) => {
    return filteredRewards.filter(reward => 
      category === "all" ? true : reward.category === category
    );
  };

  const getCategoryLabel = (category: string): { title: string; icon: React.ReactNode } => {
    switch(category) {
      case "symbolic":
        return { 
          title: "Recompensas Simbólicas", 
          icon: <Star className="h-5 w-5 text-amber-500" /> 
        };
      case "social":
        return { 
          title: "Recompensas Sociais", 
          icon: <Leaf className="h-5 w-5 text-green-500" /> 
        };
      case "physical":
        return { 
          title: "Recompensas Físicas", 
          icon: <Package className="h-5 w-5 text-blue-500" /> 
        };
      default:
        return { title: "Todas as Recompensas", icon: null };
    }
  };

  return (
    <div className="space-y-6">
      {/* Category filter */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Select
          value={categoryFilter}
          onValueChange={setCategoryFilter}
        >
          <SelectTrigger className="w-full sm:w-[220px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Todas as categorias</SelectItem>
              <SelectItem value="symbolic">Recompensas Simbólicas</SelectItem>
              <SelectItem value="social">Recompensas Sociais</SelectItem>
              <SelectItem value="physical">Recompensas Físicas</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        
        {categoryFilter !== "all" && (
          <Button variant="ghost" onClick={() => setCategoryFilter("all")} className="w-full sm:w-auto">
            Limpar filtro
          </Button>
        )}
      </div>

      {/* Display rewards */}
      {categoryFilter === "all" ? (
        // When showing all categories, group them by category
        <>
          {["symbolic", "social", "physical"].map((category) => {
            const categoryRewards = getRewardsByCategory(category);
            if (categoryRewards.length === 0) return null;
            
            const { title, icon } = getCategoryLabel(category);
            
            return (
              <div key={category} className="space-y-4">
                <div className="flex items-center gap-2">
                  {icon}
                  <h2 className="text-xl font-medium">{title}</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryRewards.map((reward) => (
                    <RewardCard 
                      key={reward.id} 
                      reward={reward} 
                      userPoints={userPoints}
                      onRedeem={onRedeem}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        // When filtering by category, just show the rewards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRewards.length > 0 ? (
            filteredRewards.map((reward) => (
              <RewardCard 
                key={reward.id} 
                reward={reward} 
                userPoints={userPoints}
                onRedeem={onRedeem}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-muted-foreground">Nenhuma recompensa encontrada com os filtros atuais.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StoreRewardList;
