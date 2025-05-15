
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, ExternalLink } from "lucide-react";

const Learning = () => {
  const articles = [
    {
      id: "a1",
      title: "A Importância da Reciclagem",
      description: "Entenda como a reciclagem contribui para a preservação do meio ambiente e como podemos implementá-la no dia a dia.",
      type: "article",
      duration: "5 min de leitura"
    },
    {
      id: "a2",
      title: "Economia de Água: Dicas Práticas",
      description: "Descubra maneiras simples e eficazes de economizar água em casa e na escola, contribuindo para a preservação desse recurso vital.",
      type: "article",
      duration: "7 min de leitura"
    },
    {
      id: "a3",
      title: "Hortas Urbanas: Um Passo para a Sustentabilidade",
      description: "Como criar e manter uma horta em espaços urbanos limitados, transformando áreas inutilizadas em locais produtivos.",
      type: "article",
      duration: "10 min de leitura"
    }
  ];

  const videos = [
    {
      id: "v1",
      title: "Como Montar uma Composteira Doméstica",
      description: "Passo a passo para criar sua própria composteira e transformar resíduos orgânicos em adubo de qualidade.",
      type: "video",
      duration: "8:24 min"
    },
    {
      id: "v2",
      title: "Poluição Plástica nos Oceanos",
      description: "Documentário sobre o impacto do plástico nos ecossistemas marinhos e as soluções que estão sendo implementadas globalmente.",
      type: "video",
      duration: "12:37 min"
    },
    {
      id: "v3",
      title: "Desmatamento e Mudanças Climáticas",
      description: "A relação entre o desmatamento de florestas e as alterações no clima global, com dados e análises de especialistas.",
      type: "video",
      duration: "15:42 min"
    }
  ];

  const activities = [
    {
      id: "act1",
      title: "Quiz: Conhecimentos sobre Biodiversidade",
      description: "Teste seus conhecimentos sobre a biodiversidade brasileira e mundial neste quiz interativo de 10 questões.",
      type: "activity",
      duration: "~5 min"
    },
    {
      id: "act2",
      title: "Calculadora de Pegada Ecológica",
      description: "Descubra o impacto de seus hábitos diários no meio ambiente e receba dicas personalizadas para reduzi-lo.",
      type: "activity",
      duration: "~8 min"
    },
    {
      id: "act3",
      title: "Jogo: Ciclo da Água",
      description: "Aprenda sobre o ciclo da água de forma divertida neste jogo educativo para todas as idades.",
      type: "activity",
      duration: "~10 min"
    }
  ];

  const renderContentCard = (item: any) => {
    let icon;
    switch (item.type) {
      case 'article':
        icon = <FileText className="h-5 w-5 text-primary" />;
        break;
      case 'video':
        icon = <Video className="h-5 w-5 text-primary" />;
        break;
      case 'activity':
        icon = <BookOpen className="h-5 w-5 text-primary" />;
        break;
      default:
        icon = <FileText className="h-5 w-5 text-primary" />;
    }

    return (
      <Card key={item.id} className="h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            {icon}
            <span className="text-xs text-muted-foreground">{item.duration}</span>
          </div>
          <CardTitle className="text-lg mt-2">{item.title}</CardTitle>
          <CardDescription className="line-clamp-2">{item.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="bg-muted rounded-md h-24 w-full flex items-center justify-center">
            <span className="text-muted-foreground">
              {item.type === 'article' ? 'Conteúdo do Artigo' : 
               item.type === 'video' ? 'Conteúdo do Vídeo' : 'Atividade Interativa'}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            {item.type === 'article' ? 'Ler artigo' : 
             item.type === 'video' ? 'Assistir vídeo' : 'Iniciar atividade'}
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Centro de Aprendizagem</h1>
      
      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="w-full mb-6 grid grid-cols-3">
          <TabsTrigger value="articles">Artigos</TabsTrigger>
          <TabsTrigger value="videos">Vídeos</TabsTrigger>
          <TabsTrigger value="activities">Atividades</TabsTrigger>
        </TabsList>
        
        <TabsContent value="articles">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map(article => renderContentCard(article))}
          </div>
        </TabsContent>
        
        <TabsContent value="videos">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map(video => renderContentCard(video))}
          </div>
        </TabsContent>
        
        <TabsContent value="activities">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activities.map(activity => renderContentCard(activity))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Learning;
