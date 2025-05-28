
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Baby, 
  Heart, 
  Calendar,
  Users,
  AlertTriangle,
  CheckCircle,
  Activity,
  Target,
  TrendingUp,
  TrendingDown,
  Stethoscope,
  Shield
} from "lucide-react";

interface HealthMetrics {
  totalRegistrations: number;
  firstTrimesterCases: {
    total: number;
    registered: number;
  };
  lastMonthDeliveries: {
    total: number;
    institutional: number;
  };
  deliveryOutcomes: {
    liveBirths: number;
    stillBirths: number;
    timelyBreastfeeding: number;
    cordInfections: number;
    weakNewborns: number;
  };
  abortions: number;
  lastTrimesterCases: {
    total: number;
    birthPreparedness: number;
  };
  deaths: {
    maternal: number;
    child: number;
  };
}

interface HealthIndicatorsProps {
  data: HealthMetrics;
  isPersonal?: boolean;
  showTrend?: boolean;
}

export const HealthIndicators = ({ data, isPersonal = false, showTrend = false }: HealthIndicatorsProps) => {
  const getPerformanceColor = (value: number, total: number, goodThreshold: number = 80) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;
    if (percentage >= goodThreshold) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getPerformanceBadge = (value: number, total: number, goodThreshold: number = 80) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;
    if (percentage >= goodThreshold) return "bg-green-100 text-green-800 border-green-200";
    if (percentage >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  const getPerformanceStatus = (value: number, total: number, goodThreshold: number = 80) => {
    const percentage = total > 0 ? (value / total) * 100 : 0;
    if (percentage >= goodThreshold) return "Excellent";
    if (percentage >= 60) return "Good";
    return "Needs Attention";
  };

  const institutionalDeliveryRate = data.lastMonthDeliveries.total > 0 
    ? (data.lastMonthDeliveries.institutional / data.lastMonthDeliveries.total) * 100 
    : 0;

  const birthPreparednessRate = data.lastTrimesterCases.total > 0 
    ? (data.lastTrimesterCases.birthPreparedness / data.lastTrimesterCases.total) * 100 
    : 0;

  const firstTrimesterRegistrationRate = data.firstTrimesterCases.total > 0 
    ? (data.firstTrimesterCases.registered / data.firstTrimesterCases.total) * 100 
    : 0;

  const timelyBreastfeedingRate = data.deliveryOutcomes.liveBirths > 0 
    ? (data.deliveryOutcomes.timelyBreastfeeding / data.deliveryOutcomes.liveBirths) * 100 
    : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {isPersonal ? "My Health Indicators" : "Health Performance Indicators"}
        </h3>
        {showTrend && (
          <div className="flex items-center space-x-1 text-green-600">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">+2.3%</span>
          </div>
        )}
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Registrations */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Total Registrations</span>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-blue-600">{data.totalRegistrations}</div>
              <p className="text-xs text-gray-500">Pregnant women registered</p>
            </div>
          </CardContent>
        </Card>

        {/* First Trimester Registration Rate */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">1st Trimester Rate</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-xl font-bold ${getPerformanceColor(data.firstTrimesterCases.registered, data.firstTrimesterCases.total, 85)}`}>
                  {Math.round(firstTrimesterRegistrationRate)}%
                </span>
                <Badge className={getPerformanceBadge(data.firstTrimesterCases.registered, data.firstTrimesterCases.total, 85)}>
                  {getPerformanceStatus(data.firstTrimesterCases.registered, data.firstTrimesterCases.total, 85)}
                </Badge>
              </div>
              <Progress value={firstTrimesterRegistrationRate} className="h-2" />
              <p className="text-xs text-gray-500">{data.firstTrimesterCases.registered}/{data.firstTrimesterCases.total} cases</p>
            </div>
          </CardContent>
        </Card>

        {/* Institutional Delivery Rate */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Institutional Delivery</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-xl font-bold ${getPerformanceColor(data.lastMonthDeliveries.institutional, data.lastMonthDeliveries.total, 90)}`}>
                  {Math.round(institutionalDeliveryRate)}%
                </span>
                <Badge className={getPerformanceBadge(data.lastMonthDeliveries.institutional, data.lastMonthDeliveries.total, 90)}>
                  {getPerformanceStatus(data.lastMonthDeliveries.institutional, data.lastMonthDeliveries.total, 90)}
                </Badge>
              </div>
              <Progress value={institutionalDeliveryRate} className="h-2" />
              <p className="text-xs text-gray-500">{data.lastMonthDeliveries.institutional}/{data.lastMonthDeliveries.total} deliveries</p>
            </div>
          </CardContent>
        </Card>

        {/* Birth Preparedness */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-5 w-5 text-indigo-600" />
              <span className="text-sm font-medium text-gray-700">Birth Preparedness</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-xl font-bold ${getPerformanceColor(data.lastTrimesterCases.birthPreparedness, data.lastTrimesterCases.total, 85)}`}>
                  {Math.round(birthPreparednessRate)}%
                </span>
                <Badge className={getPerformanceBadge(data.lastTrimesterCases.birthPreparedness, data.lastTrimesterCases.total, 85)}>
                  {getPerformanceStatus(data.lastTrimesterCases.birthPreparedness, data.lastTrimesterCases.total, 85)}
                </Badge>
              </div>
              <Progress value={birthPreparednessRate} className="h-2" />
              <p className="text-xs text-gray-500">{data.lastTrimesterCases.birthPreparedness}/{data.lastTrimesterCases.total} cases</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delivery Outcomes */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Baby className="h-4 w-4 text-pink-600" />
            Delivery Outcomes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-800">Live Births</span>
                <span className="text-lg font-bold text-green-600">{data.deliveryOutcomes.liveBirths}</span>
              </div>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-800">Still Births</span>
                <span className="text-lg font-bold text-red-600">{data.deliveryOutcomes.stillBirths}</span>
              </div>
            </div>
          </div>

          {/* Newborn Care Indicators */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Timely Breastfeeding (TIBF)</span>
              <span className={`font-medium ${getPerformanceColor(data.deliveryOutcomes.timelyBreastfeeding, data.deliveryOutcomes.liveBirths, 80)}`}>
                {data.deliveryOutcomes.timelyBreastfeeding}/{data.deliveryOutcomes.liveBirths} ({Math.round(timelyBreastfeedingRate)}%)
              </span>
            </div>
            <Progress value={timelyBreastfeedingRate} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Cord Infections</span>
              <span className="font-medium text-orange-600">{data.deliveryOutcomes.cordInfections}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Weak Newborns</span>
              <span className="font-medium text-yellow-600">{data.deliveryOutcomes.weakNewborns}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Indicators */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 opacity-80" />
              <div>
                <p className="text-orange-100 text-xs">Abortions</p>
                <p className="text-lg font-bold">{data.abortions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 opacity-80" />
              <div>
                <p className="text-red-100 text-xs">Maternal Deaths</p>
                <p className="text-lg font-bold">{data.deaths.maternal}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-3">
            <div className="flex items-center space-x-2">
              <Baby className="h-5 w-5 opacity-80" />
              <div>
                <p className="text-purple-100 text-xs">Child Deaths</p>
                <p className="text-lg font-bold">{data.deaths.child}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
