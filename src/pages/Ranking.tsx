
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RankingUser } from "@/components/common/RankingTable";
import RankingTable from "@/components/common/RankingTable";

const Ranking = () => {
  // Mock data - would come from an API in a real application
  const [students] = useState<RankingUser[]>([
    { id: "1", name: "Pedro Silva", points: 820, completedChallenges: 12, group: "7º Ano B" },
    { id: "2", name: "Maria Oliveira", points: 780, completedChallenges: 11, group: "8º Ano A" },
    { id: "3", name: "João Santos", points: 720, completedChallenges: 10, group: "7º Ano B" },
    { id: "4", name: "Ana Costa", points: 690, completedChallenges: 9, group: "6º Ano C" },
    { id: "5", name: "Lucas Pereira", points: 650, completedChallenges: 8, group: "8º Ano A" },
    { id: "6", name: "Beatriz Lima", points: 610, completedChallenges: 7, group: "7º Ano C" },
    { id: "7", name: "Guilherme Ferreira", points: 590, completedChallenges: 7, group: "8º Ano B" },
    { id: "8", name: "Isabela Martins", points: 550, completedChallenges: 6, group: "6º Ano A" },
    { id: "9", name: "Gabriel Souza", points: 520, completedChallenges: 6, group: "7º Ano A" },
    { id: "10", name: "Sofia Almeida", points: 500, completedChallenges: 5, group: "8º Ano C" },
  ]);

  const [classes] = useState<RankingUser[]>([
    { id: "c1", name: "8º Ano A", points: 4250, completedChallenges: 58, group: "E.E. Paulo Freire" },
    { id: "c2", name: "7º Ano B", points: 3980, completedChallenges: 52, group: "E.E. Paulo Freire" },
    { id: "c3", name: "6º Ano C", points: 3670, completedChallenges: 48, group: "E.E. Anísio Teixeira" },
    { id: "c4", name: "8º Ano B", points: 3480, completedChallenges: 45, group: "E.E. Paulo Freire" },
    { id: "c5", name: "7º Ano A", points: 3350, completedChallenges: 43, group: "E.E. Cecília Meireles" },
  ]);

  const [schools] = useState<RankingUser[]>([
    { id: "s1", name: "E.E. Paulo Freire", points: 12450, completedChallenges: 168, group: "São Paulo" },
    { id: "s2", name: "E.E. Anísio Teixeira", points: 10780, completedChallenges: 145, group: "Belo Horizonte" },
    { id: "s3", name: "E.E. Cecília Meireles", points: 9620, completedChallenges: 129, group: "Rio de Janeiro" },
    { id: "s4", name: "E.E. Darcy Ribeiro", points: 8950, completedChallenges: 121, group: "Brasília" },
    { id: "s5", name: "E.E. Milton Santos", points: 8120, completedChallenges: 110, group: "Salvador" },
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Ranking GreenLearn</h1>
      
      <Tabs defaultValue="students" className="w-full">
        <TabsList className="w-full mb-6 grid grid-cols-3">
          <TabsTrigger value="students">Alunos</TabsTrigger>
          <TabsTrigger value="classes">Turmas</TabsTrigger>
          <TabsTrigger value="schools">Escolas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="students">
          <div className="bg-card p-4 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Top Alunos</h2>
            <RankingTable users={students} type="students" />
          </div>
        </TabsContent>
        
        <TabsContent value="classes">
          <div className="bg-card p-4 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Top Turmas</h2>
            <RankingTable users={classes} type="classes" />
          </div>
        </TabsContent>
        
        <TabsContent value="schools">
          <div className="bg-card p-4 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Top Escolas</h2>
            <RankingTable users={schools} type="schools" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Ranking;
