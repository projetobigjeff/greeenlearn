import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  PlusCircle, 
  CheckCircle, 
  XCircle, 
  BarChart,
  Users,
  Calendar,
  Clock,
  Star 
} from "lucide-react";
import { Challenge } from "@/components/challenges/ChallengeCard";

interface Submission {
  id: string;
  challengeId: string;
  challengeTitle: string;
  studentName: string;
  studentClass: string;
  submissionDate: string;
  status: "pending" | "approved" | "rejected";
  description: string;
  mediaUrl?: string;
}

const Teacher = () => {
  const [pendingSubmissions, setPendingSubmissions] = useState<Submission[]>([
    {
      id: "sub1",
      challengeId: "1",
      challengeTitle: "Caça ao Lixo no Parque",
      studentName: "Pedro Silva",
      studentClass: "7º Ano B",
      submissionDate: "11/03/2025",
      status: "pending",
      description: "Organizei uma limpeza no Parque Municipal com 5 colegas. Recolhemos 12kg de lixo, sendo 8kg recicláveis.",
      mediaUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: "sub2",
      challengeId: "2",
      challengeTitle: "Horta Vertical na Escola",
      studentName: "Maria Oliveira",
      studentClass: "8º Ano A",
      submissionDate: "10/03/2025",
      status: "pending",
      description: "Construí uma horta vertical usando garrafas PET. Plantei alface, cebolinha e coentro. Estou regando diariamente.",
      mediaUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=1470&auto=format&fit=crop"
    }
  ]);

  const [teacherChallenges] = useState<Challenge[]>([
    {
      id: "1",
      title: "Caça ao Lixo no Parque",
      description: "Organize ou participe de uma limpeza coletiva no parque mais próximo da sua escola. Colete o máximo de resíduos recicláveis e registre a ação com fotos.",
      imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1470&auto=format&fit=crop",
      category: "Limpeza",
      difficulty: "medium",
      points: 75,
      dueDate: "15/05/2025"
    },
    {
      id: "2",
      title: "Horta Vertical na Escola",
      description: "Crie uma horta vertical utilizando materiais recicláveis. Plante temperos ou pequenas hortaliças e documente o crescimento ao longo de duas semanas.",
      imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=1470&auto=format&fit=crop",
      category: "Agricultura",
      difficulty: "easy",
      points: 50,
      dueDate: "20/05/2025"
    }
  ]);

  const [classAnalytics] = useState({
    totalStudents: 28,
    activeStudents: 22,
    totalChallengesCompleted: 156,
    participationRate: 79,
    averagePointsPerStudent: 324,
    mostActiveStudents: [
      { name: "Pedro Silva", points: 820, completedChallenges: 12 },
      { name: "Maria Oliveira", points: 780, completedChallenges: 11 },
      { name: "João Santos", points: 720, completedChallenges: 10 }
    ],
    challengeCategories: [
      { name: "Limpeza", count: 45 },
      { name: "Água", count: 38 },
      { name: "Agricultura", count: 32 },
      { name: "Educação", count: 25 },
      { name: "Energia", count: 16 }
    ]
  });

  const handleApproveSubmission = (id: string) => {
    setPendingSubmissions(prev => 
      prev.map(sub => sub.id === id ? {...sub, status: "approved"} : sub)
    );
  };

  const handleRejectSubmission = (id: string) => {
    setPendingSubmissions(prev => 
      prev.map(sub => sub.id === id ? {...sub, status: "rejected"} : sub)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Painel do Professor</h1>
      
      <Tabs defaultValue="submissions">
        <TabsList className="w-full mb-6 grid grid-cols-3">
          <TabsTrigger value="submissions">Submissões</TabsTrigger>
          <TabsTrigger value="challenges">Desafios</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
        </TabsList>
        
        {/* Submissões de Alunos */}
        <TabsContent value="submissions">
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Submissões Pendentes</h2>
            
            {pendingSubmissions.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-muted-foreground">Não há submissões pendentes no momento.</p>
                </CardContent>
              </Card>
            ) : (
              pendingSubmissions.map(submission => (
                <Card key={submission.id} className={
                  submission.status === "approved" ? "border-green-500/50 bg-green-50/50 dark:bg-green-950/10" :
                  submission.status === "rejected" ? "border-red-500/50 bg-red-50/50 dark:bg-red-950/10" : ""
                }>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0">
                    <div>
                      <CardTitle>{submission.challengeTitle}</CardTitle>
                      <CardDescription>
                        Submetido por {submission.studentName} ({submission.studentClass}) em {submission.submissionDate}
                      </CardDescription>
                    </div>
                    <Badge variant={
                      submission.status === "pending" ? "outline" :
                      submission.status === "approved" ? "default" :
                      "destructive"
                    }>
                      {submission.status === "pending" ? "Pendente" :
                       submission.status === "approved" ? "Aprovado" : "Recusado"}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {submission.mediaUrl && (
                        <div className="md:col-span-1">
                          <div className="rounded-md overflow-hidden h-48">
                            <img 
                              src={submission.mediaUrl} 
                              alt="Submissão" 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        </div>
                      )}
                      <div className={submission.mediaUrl ? "md:col-span-2" : "md:col-span-3"}>
                        <h3 className="font-medium mb-2">Descrição da ação:</h3>
                        <p className="text-sm">{submission.description}</p>
                      </div>
                    </div>
                  </CardContent>
                  {submission.status === "pending" && (
                    <CardFooter className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        onClick={() => handleRejectSubmission(submission.id)}
                      >
                        <XCircle className="mr-2 h-4 w-4" /> Recusar
                      </Button>
                      <Button 
                        onClick={() => handleApproveSubmission(submission.id)}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" /> Aprovar
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        {/* Criação e Gestão de Desafios */}
        <TabsContent value="challenges">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Criar Novo Desafio</CardTitle>
                <CardDescription>Defina um novo desafio ambiental para seus alunos</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título do Desafio</Label>
                      <Input id="title" placeholder="Ex: Limpeza do Parque Municipal" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="limpeza">Limpeza</SelectItem>
                            <SelectItem value="agua">Água</SelectItem>
                            <SelectItem value="agricultura">Agricultura</SelectItem>
                            <SelectItem value="educacao">Educação</SelectItem>
                            <SelectItem value="energia">Energia</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Dificuldade</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Fácil</SelectItem>
                          <SelectItem value="medium">Médio</SelectItem>
                          <SelectItem value="hard">Difícil</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="points">Pontuação</Label>
                      <Input id="points" type="number" placeholder="Ex: 75" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Data Final</Label>
                      <Input id="dueDate" type="date" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Descreva o desafio ambiental, incluindo objetivos e instruções claras para os alunos."
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">Imagem (URL)</Label>
                    <Input id="image" placeholder="https://example.com/image.jpg" />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Criar Desafio
                </Button>
              </CardFooter>
            </Card>
            
            <h2 className="text-xl font-medium mt-8 mb-4">Seus Desafios Ativos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teacherChallenges.map(challenge => (
                <Card key={challenge.id}>
                  <CardHeader>
                    <div className="flex justify-between">
                      <Badge variant="outline">{challenge.category}</Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-primary" />
                        <span>{challenge.points} pontos</span>
                      </div>
                    </div>
                    <CardTitle className="mt-2">{challenge.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {challenge.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Até {challenge.dueDate}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm">
                      Ver Submissões
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        {/* Análises e Estatísticas */}
        <TabsContent value="analytics">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-muted-foreground mr-2" />
                    <div className="text-2xl font-bold">{classAnalytics.totalStudents}</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {classAnalytics.activeStudents} ativos ({classAnalytics.participationRate}%)
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Desafios Completados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-muted-foreground mr-2" />
                    <div className="text-2xl font-bold">{classAnalytics.totalChallengesCompleted}</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Média de {Math.round(classAnalytics.totalChallengesCompleted / classAnalytics.totalStudents)} por aluno
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Média de Pontos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <BarChart className="h-5 w-5 text-muted-foreground mr-2" />
                    <div className="text-2xl font-bold">{classAnalytics.averagePointsPerStudent}</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Por aluno ativo
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alunos Mais Ativos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {classAnalytics.mostActiveStudents.map((student, index) => (
                      <div key={index} className="flex items-center">
                        <div className="bg-primary/10 w-8 h-8 flex items-center justify-center rounded-full mr-3">
                          {index + 1}
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium">{student.name}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="h-3.5 w-3.5 mr-1" />
                            <span>{student.completedChallenges} desafios</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-primary mr-1" />
                          <span>{student.points}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Participação por Categoria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {classAnalytics.challengeCategories.map((category, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{category.name}</span>
                          <span className="text-sm text-muted-foreground">{category.count}</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div 
                            className="bg-primary h-full rounded-full" 
                            style={{ 
                              width: `${(category.count / classAnalytics.totalChallengesCompleted) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Teacher;
