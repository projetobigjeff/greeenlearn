
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import UserAvatar from "./UserAvatar";

export interface RankingUser {
  id: string;
  name: string;
  imageUrl?: string;
  points: number;
  completedChallenges: number;
  group?: string; // Class or school
}

interface RankingTableProps {
  users: RankingUser[];
  type: "students" | "classes" | "schools";
  limit?: number;
}

const RankingTable = ({ users, type, limit }: RankingTableProps) => {
  const displayUsers = limit ? users.slice(0, limit) : users;
  
  const typeLabels = {
    students: {
      title: "Ranking de Alunos",
      entityLabel: "Aluno",
      groupLabel: "Turma"
    },
    classes: {
      title: "Ranking de Turmas",
      entityLabel: "Turma",
      groupLabel: "Escola"
    },
    schools: {
      title: "Ranking de Escolas",
      entityLabel: "Escola",
      groupLabel: ""
    }
  };

  return (
    <div className="bg-card rounded-md shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>{typeLabels[type].entityLabel}</TableHead>
            {type !== "schools" && (
              <TableHead>{typeLabels[type].groupLabel}</TableHead>
            )}
            <TableHead className="text-right">Desafios</TableHead>
            <TableHead className="text-right">Pontos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayUsers.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {index === 0 ? (
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-yellow-100 text-yellow-800 rounded-full">🥇</span>
                ) : index === 1 ? (
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-800 rounded-full">🥈</span>
                ) : index === 2 ? (
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-amber-100 text-amber-800 rounded-full">🥉</span>
                ) : (
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-muted text-muted-foreground rounded-full">{index + 1}</span>
                )}
              </TableCell>
              <TableCell className="flex items-center gap-2">
                {type === "students" ? (
                  <>
                    <UserAvatar name={user.name} image={user.imageUrl} size="sm" />
                    <span>{user.name}</span>
                  </>
                ) : (
                  <span>{user.name}</span>
                )}
              </TableCell>
              {type !== "schools" && (
                <TableCell>{user.group}</TableCell>
              )}
              <TableCell className="text-right">{user.completedChallenges}</TableCell>
              <TableCell className="font-medium text-right">{user.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RankingTable;
