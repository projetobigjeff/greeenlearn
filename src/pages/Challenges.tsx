
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ChallengeList from "@/components/challenges/ChallengeList";
import { Challenge } from "@/components/challenges/ChallengeCard";

const Challenges = () => {
  const { toast } = useToast();
  
  // Mock data - would be fetched from a backend in a real application
  const [challenges] = useState<Challenge[]>([
    {
      id: "1",
      title: "Caça ao Lixo no Parque",
      description: "Organize ou participe de uma limpeza coletiva no parque mais próximo da sua escola. Colete o máximo de resíduos recicláveis e registre a ação com fotos.",
      imageUrl: "caca-ao-lixo",
      category: "Limpeza",
      difficulty: "medium",
      points: 75,
      dueDate: "15/05/2025",
      isWeeklyChallenge: true
    },
    {
      id: "2",
      title: "Horta Vertical na Escola",
      description: "Crie uma horta vertical utilizando materiais recicláveis. Plante temperos ou pequenas hortaliças e documente o crescimento ao longo de duas semanas.",
      imageUrl: "horta-vertical",
      category: "Agricultura",
      difficulty: "easy",
      points: 50,
      dueDate: "20/05/2025"
    },
    {
      id: "3",
      title: "Palestra de Conscientização",
      description: "Prepare e apresente uma palestra de 15 minutos sobre a importância da reciclagem para alunos de séries iniciais. Use recursos visuais criativos.",
      imageUrl: "palestra",
      category: "Educação",
      difficulty: "medium",
      points: 65,
      dueDate: "25/05/2025"
    },
    {
      id: "4",
      title: "Economia de Água em Casa",
      description: "Desenvolva e implemente estratégias para economizar água em sua casa durante uma semana. Registre o antes e depois do consumo.",
      imageUrl: "economia-agua",
      category: "Água",
      difficulty: "easy",
      points: 45,
      dueDate: "18/05/2025"
    },
    {
      id: "5",
      title: "Documentário Ambiental Local",
      description: "Crie um mini-documentário (2-5 min) sobre um problema ambiental específico em sua comunidade e proponha soluções práticas.",
      imageUrl: "documentario",
      category: "Educação",
      difficulty: "hard",
      points: 100,
      dueDate: "30/05/2025"
    },
  ]);

  const handleParticipateInChallenge = (id: string) => {
    toast({
      title: "Desafio aceito!",
      description: "Você se inscreveu no desafio com sucesso.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Desafios Ambientais</h1>
      <ChallengeList 
        challenges={challenges} 
        onParticipate={handleParticipateInChallenge} 
      />
    </div>
  );
};

export default Challenges;
