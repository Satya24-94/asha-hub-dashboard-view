
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Target,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Calendar
} from "lucide-react";

interface PerformanceData {
  completionRate: number;
  timelyDelivery: number;
  beneficiaryReach: number;
  qualityScore: number;
  monthlyTrend: number;
  activeDays: number;
  totalBeneficiaries: number;
  overdueActivities: number;
}

interface PerformanceIndicatorsProps {
  data: PerformanceData;
  isPersonal?: boolean;
}

export const PerformanceIndicators = ({ data, isPersonal = false }: PerformanceIndicatorsProps) => {
  const getPerformanceColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return "text-green-600";
    if (value >= thresholds.warning) return "text-yellow-600";
    return "text-red-600";
  };

  const getPerformanceBadge = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return "bg-green-100 text-green-800 border-green-200";
    if (value >= thresholds.warning) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const indicators = [
    {
      title: "Task Completion Rate",
      value: data.completionRate,
      icon: CheckCircle,
      suffix: "%",
      thresholds: { good: 80, warning: 60 },
      description: "Percentage of assigned tasks completed on time"
    },
    {
      title: "Timely Delivery",
      value: data.timelyDelivery,
      icon: Clock,
      suffix: "%",
      thresholds: { good: 85, warning: 70 },
      description: "Services delivered within expected timeframe"
    },
    {
      title: "Beneficiary Reach",
      value: data.beneficiaryReach,
      icon: Users,
      suffix: "%",
      thresholds: { good: 90, warning: 75 },
      description: "Coverage of assigned beneficiary population"
    },
    {
      title: "Quality Score",
      value: data.qualityScore,
      icon: Target,
      suffix: "%",
      thresholds: { good: 85, warning: 70 },
      description: "Overall service quality assessment"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {isPersonal ? "My Performance" : "Performance Indicators"}
        </h3>
        <div className="flex items-center space-x-2">
          {data.monthlyTrend > 0 ? (
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">+{data.monthlyTrend}%</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1 text-red-600">
              <TrendingDown className="h-4 w-4" />
              <span className="text-sm font-medium">{data.monthlyTrend}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Key Performance Indicators Grid */}
      <div className="grid grid-cols-2 gap-3">
        {indicators.map((indicator) => {
          const IconComponent = indicator.icon;
          return (
            <Card key={indicator.title} className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <IconComponent className="h-5 w-5 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">{indicator.title}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-2xl font-bold ${getPerformanceColor(indicator.value, indicator.thresholds)}`}>
                      {indicator.value}{indicator.suffix}
                    </span>
                    <Badge className={getPerformanceBadge(indicator.value, indicator.thresholds)}>
                      {indicator.value >= indicator.thresholds.good ? "Good" : 
                       indicator.value >= indicator.thresholds.warning ? "Fair" : "Needs Improvement"}
                    </Badge>
                  </div>
                  <Progress value={indicator.value} className="h-2" />
                  <p className="text-xs text-gray-500">{indicator.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 opacity-80" />
              <div>
                <p className="text-blue-100 text-xs">Active Days</p>
                <p className="text-lg font-bold">{data.activeDays}/30</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 opacity-80" />
              <div>
                <p className="text-green-100 text-xs">Beneficiaries</p>
                <p className="text-lg font-bold">{data.totalBeneficiaries}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 opacity-80" />
              <div>
                <p className="text-orange-100 text-xs">Overdue</p>
                <p className="text-lg font-bold">{data.overdueActivities}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
