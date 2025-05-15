import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Leaf, ArrowRight } from "lucide-react";
import Water from "@/components/icons/Water";
import AuthForm from "@/components/auth/AuthForm";
import ChallengeCard, { Challenge } from "@/components/challenges/ChallengeCard";
import ImpactMetricsComponent from "@/components/dashboard/ImpactMetrics";
import RankingTable, { RankingUser } from "@/components/common/RankingTable";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Demo weekly challenge
  const weeklyChallenge: Challenge = {
    id: "weekly1",
    title: "Caça ao Lixo no Parque",
    description: "Organize ou participe de uma limpeza coletiva no parque mais próximo da sua escola. Colete o máximo de resíduos recicláveis e registre a ação com fotos.",
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1470&auto=format&fit=crop",
    category: "Limpeza",
    difficulty: "medium",
    points: 75,
    dueDate: "15/05/2025",
    isWeeklyChallenge: true
  };
  
  // Demo impact metrics
  const impactMetrics = {
    waterSaved: 12500,
    waterSavedGoal: 20000,
    wasteRecycled: 345,
    wasteRecycledGoal: 500,
    treesPlanted: 28,
    treesPlantedGoal: 50,
    historicalData: [
      { month: "Jan", waterSaved: 2000, wasteRecycled: 45, treesPlanted: 5 },
      { month: "Fev", waterSaved: 2200, wasteRecycled: 55, treesPlanted: 6 },
      { month: "Mar", waterSaved: 2800, wasteRecycled: 70, treesPlanted: 5 },
      { month: "Abr", waterSaved: 2700, wasteRecycled: 65, treesPlanted: 4 },
      { month: "Mai", waterSaved: 2800, wasteRecycled: 110, treesPlanted: 8 }
    ]
  };
  
  // Demo ranking data
  const topStudents: RankingUser[] = [
    { id: "1", name: "Pedro Silva", points: 820, completedChallenges: 12, group: "7º Ano B" },
    { id: "2", name: "Maria Oliveira", points: 780, completedChallenges: 11, group: "8º Ano A" },
    { id: "3", name: "João Santos", points: 720, completedChallenges: 10, group: "7º Ano B" },
    { id: "4", name: "Ana Costa", points: 690, completedChallenges: 9, group: "6º Ano C" },
    { id: "5", name: "Lucas Pereira", points: 650, completedChallenges: 8, group: "8º Ano A" }
  ];

  const handleLogin = (email: string, password: string, role: string) => {
    // Here you would implement actual authentication
    console.log("Login attempt:", { email, password, role });
    setIsLoggedIn(true);
  };

  const handleRegister = (name: string, email: string, password: string, role: string) => {
    // Here you would implement actual registration
    console.log("Register attempt:", { name, email, password, role });
    setIsLoggedIn(true);
  };

  const handleChallengeParticipation = (id: string) => {
    toast.success("Inscrição no desafio realizada com sucesso!");
  };

  // Logged out view (Login/Register)
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-900 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
            <div className="flex items-center mb-4">
              <div className="bg-primary rounded-full p-2 mr-3">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold">GreenLearn</h1>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Aprenda sobre o meio ambiente de forma divertida
            </h2>
            <p className="text-lg mb-6 text-muted-foreground">
              Participe de desafios ecológicos, ganhe pontos e faça a diferença
              no mundo enquanto aprende. Uma plataforma gamificada para escolas
              promoverem educação ambiental.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start">
                <div className="bg-primary/10 rounded-full p-2 mr-3">
                  <Leaf className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Desafios Semanais</h3>
                  <p className="text-sm text-muted-foreground">
                    Novas atividades toda semana para manter o engajamento
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/10 rounded-full p-2 mr-3">
                  <Water className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Impacto Mensurável</h3>
                  <p className="text-sm text-muted-foreground">
                    Veja o impacto real das suas ações no meio ambiente
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
          </div>
        </div>
      </div>
    );
  }

  // Logged in view (Dashboard)
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Hero Section with Weekly Challenge */}
      <section className="mb-10">
        <h1 className="text-2xl font-bold mb-6">Desafio da Semana</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChallengeCard
              challenge={weeklyChallenge}
              onParticipate={handleChallengeParticipation}
              featured={true}
            />
          </div>
          <div className="bg-card rounded-lg shadow-sm p-6 flex flex-col justify-center">
            <h2 className="font-semibold text-lg mb-4">Seu Progresso</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Desafios Completados</span>
                  <span className="font-medium">8/20</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "40%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Pontos Acumulados</span>
                  <span className="font-medium">580 pts</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: "58%" }}></div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Link to="/challenges">
                <Button variant="outline" className="w-full">
                  Ver Todos os Desafios
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ranking Section */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Ranking de Alunos</h2>
          <Link to="/ranking">
            <Button variant="ghost" size="sm">
              Ver Completo
            </Button>
          </Link>
        </div>
        <RankingTable users={topStudents} type="students" />
      </section>

      {/* Environmental Impact Section */}
      <section className="mb-6">
        <ImpactMetricsComponent metrics={impactMetrics} />
      </section>
    </div>
  );
};

export default Index;
