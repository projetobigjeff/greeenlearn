import { BarChart, Leaf } from "lucide-react";
import Water from "../icons/Water";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// For the actual chart
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ImpactMetrics {
  waterSaved: number;
  waterSavedGoal: number;
  wasteRecycled: number;
  wasteRecycledGoal: number;
  treesPlanted: number;
  treesPlantedGoal: number;
  historicalData: {
    month: string;
    waterSaved: number;
    wasteRecycled: number;
    treesPlanted: number;
  }[];
}

interface ImpactMetricsProps {
  metrics: ImpactMetrics;
}

const ImpactMetricsComponent = ({ metrics }: ImpactMetricsProps) => {
  const {
    waterSaved,
    waterSavedGoal,
    wasteRecycled,
    wasteRecycledGoal,
    treesPlanted,
    treesPlantedGoal,
    historicalData,
  } = metrics;

  const waterProgress = (waterSaved / waterSavedGoal) * 100;
  const wasteProgress = (wasteRecycled / wasteRecycledGoal) * 100;
  const treesProgress = (treesPlanted / treesPlantedGoal) * 100;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Impacto Ambiental</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          icon={<Water className="h-5 w-5 text-blue-500" />}
          title="Água Economizada"
          value={`${waterSaved.toLocaleString()} litros`}
          progress={waterProgress}
          goal={`${waterSavedGoal.toLocaleString()} litros`}
          color="bg-blue-500"
        />
        <MetricCard
          icon={<Recycle className="h-5 w-5 text-green-500" />}
          title="Resíduos Reciclados"
          value={`${wasteRecycled.toLocaleString()} kg`}
          progress={wasteProgress}
          goal={`${wasteRecycledGoal.toLocaleString()} kg`}
          color="bg-green-500"
        />
        <MetricCard
          icon={<Leaf className="h-5 w-5 text-ecological-500" />}
          title="Árvores Plantadas"
          value={`${treesPlanted}`}
          progress={treesProgress}
          goal={`${treesPlantedGoal}`}
          color="bg-ecological-500"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progresso Mensal</CardTitle>
          <CardDescription>
            Acompanhe a evolução ao longo dos meses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ReBarChart
                data={historicalData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="waterSaved" name="Água (L)" fill="#3b82f6" />
                <Bar dataKey="wasteRecycled" name="Resíduos (kg)" fill="#22c55e" />
                <Bar dataKey="treesPlanted" name="Árvores" fill="#4caf50" />
              </ReBarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  progress: number;
  goal: string;
  color: string;
}

const MetricCard = ({
  icon,
  title,
  value,
  progress,
  goal,
  color,
}: MetricCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {icon}
      </div>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="text-2xl font-bold">{value}</div>
      <Progress value={progress} className={`h-2 ${color}`} />
      <div className="text-xs text-muted-foreground">
        Meta: {goal}
      </div>
    </CardContent>
  </Card>
);

// Simple recycling icon
const Recycle = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 0-.004-1.784L7.196 9.5" />
    <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
    <path d="m14 16-3 3 3 3" />
    <path d="M8.293 13.596 4.275 7.395C3.918 6.818 4.25 6 4.944 6h9.261c2.7 0 3.873 3.261 2.278 5.057l-2.505 2.817" />
    <path d="M7.875 12.568 11.5 15" />
  </svg>
);

export default ImpactMetricsComponent;
