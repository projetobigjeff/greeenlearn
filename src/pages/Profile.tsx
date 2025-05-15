import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Leaf, BadgeCheck, BarChart, Clock, Star, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Water from "@/components/icons/Water";

const Profile = () => {
  // Mock user data
  const [userData] = useState({
    name: "Ana Silva",
    email: "ana.silva@escola.edu.br",
    school: "E.E. Paulo Freire",
    class: "8º Ano A",
    joinDate: "Fev 2025",
    points: 580,
    level: 4,
    completedChallenges: 8,
    nextLevelPoints: 750,
    badges: [
      { id: "b1", name: "Novato Verde", description: "Completou seu primeiro desafio", date: "15/02/2025", icon: <Leaf className="h-6 w-6" /> },
      { id: "b2", name: "Reciclador Bronze", description: "Participou de 3 desafios de reciclagem", date: "28/02/2025", icon: <BadgeCheck className="h-6 w-6" /> },
      { id: "b3", name: "Economizador de Água", description: "Economizou mais de 500L de água", date: "10/03/2025", icon: <Award className="h-6 w-6" /> }
    ],
    recentChallenges: [
      { id: "rc1", title: "Caça ao Lixo no Parque", date: "10/03/2025", status: "Aprovado", points: 75 },
      { id: "rc2", title: "Economia de Água em Casa", date: "28/02/2025", status: "Aprovado", points: 45 },
      { id: "rc3", title: "Horta Vertical na Escola", date: "15/02/2025", status: "Aprovado", points: 50 }
    ],
    impact: {
      waterSaved: 580,
      wasteRecycled: 12.5,
      treesPlanted: 2
    },
    rewards: [
      { id: "r1", name: "Certificado Digital de Guardião do Meio Ambiente", date: "05/03/2025", status: "Aprovado" },
    ]
  });

  // Calculate level progress
  const levelProgress = ((userData.points - 500) / (userData.nextLevelPoints - 500)) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* User Profile Summary */}
        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-primary">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <CardTitle>{userData.name}</CardTitle>
              <CardDescription>{userData.school} - {userData.class}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <Award className="h-5 w-5 mr-2 text-primary" />
                      <span className="font-medium">Nível {userData.level}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{userData.points}/{userData.nextLevelPoints} pontos</span>
                  </div>
                  <Progress value={levelProgress} className="h-2" />
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <p className="text-lg font-bold">{userData.completedChallenges}</p>
                    <p className="text-xs">Desafios</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <p className="text-lg font-bold">{userData.badges.length}</p>
                    <p className="text-xs">Conquistas</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <p className="text-lg font-bold">{userData.points}</p>
                    <p className="text-xs">Pontos</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Membro desde</h3>
                  <p className="text-sm text-muted-foreground">{userData.joinDate}</p>
                </div>

                <Button variant="outline" className="w-full">Editar Perfil</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Details Tabs */}
        <div className="w-full md:w-2/3">
          <Tabs defaultValue="activities">
            <TabsList className="w-full grid grid-cols-4 mb-6">
              <TabsTrigger value="activities">Atividades</TabsTrigger>
              <TabsTrigger value="badges">Conquistas</TabsTrigger>
              <TabsTrigger value="rewards">Recompensas</TabsTrigger>
              <TabsTrigger value="impact">Impacto</TabsTrigger>
            </TabsList>

            <TabsContent value="activities">
              <Card>
                <CardHeader>
                  <CardTitle>Desafios Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.recentChallenges.map(challenge => (
                      <div key={challenge.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                        <div>
                          <h4 className="font-medium">{challenge.title}</h4>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>{challenge.date}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <Badge variant={challenge.status === "Aprovado" ? "default" : "secondary"}>
                            {challenge.status}
                          </Badge>
                          <div className="flex items-center text-sm mt-1">
                            <Star className="h-3.5 w-3.5 mr-1 text-primary" />
                            <span>{challenge.points} pts</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full">
                      Ver Todos os Desafios
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="badges">
              <Card>
                <CardHeader>
                  <CardTitle>Minhas Conquistas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData.badges.map(badge => (
                      <Card key={badge.id}>
                        <CardContent className="p-4 flex items-center space-x-4">
                          <div className="bg-primary/10 p-3 rounded-full">
                            {badge.icon}
                          </div>
                          <div>
                            <h4 className="font-medium">{badge.name}</h4>
                            <p className="text-sm text-muted-foreground">{badge.description}</p>
                            <p className="text-xs mt-1">Conquistado em {badge.date}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rewards">
              <Card>
                <CardHeader>
                  <CardTitle>Minhas Recompensas</CardTitle>
                </CardHeader>
                <CardContent>
                  {userData.rewards.length > 0 ? (
                    <div className="space-y-4">
                      {userData.rewards.map(reward => (
                        <div key={reward.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                          <div>
                            <h4 className="font-medium">{reward.name}</h4>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-3.5 w-3.5 mr-1" />
                              <span>{reward.date}</span>
                            </div>
                          </div>
                          <Badge variant={reward.status === "Aprovado" ? "default" : "secondary"}>
                            {reward.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">Você ainda não resgatou nenhuma recompensa</p>
                      <Button className="mt-4" variant="outline">
                        Visitar Loja Verde
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="impact">
              <Card>
                <CardHeader>
                  <CardTitle>Meu Impacto Ambiental</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center">
                          <Water className="h-10 w-10 text-blue-500 mb-2" />
                          <p className="text-2xl font-bold">{userData.impact.waterSaved} L</p>
                          <p className="text-sm text-center">Água economizada</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center">
                          <BarChart className="h-10 w-10 text-green-500 mb-2" />
                          <p className="text-2xl font-bold">{userData.impact.wasteRecycled} kg</p>
                          <p className="text-sm text-center">Lixo reciclado</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center">
                          <Leaf className="h-10 w-10 text-green-700 mb-2" />
                          <p className="text-2xl font-bold">{userData.impact.treesPlanted}</p>
                          <p className="text-sm text-center">Árvores plantadas</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Ver Detalhes de Impacto
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
