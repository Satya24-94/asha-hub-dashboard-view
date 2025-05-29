
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRange } from "react-day-picker";
import { 
  Users, 
  Heart, 
  TrendingUp, 
  Activity,
  CheckCircle,
  Clock,
  Filter,
  Star
} from "lucide-react";
import { AshaList } from "@/components/AshaList";
import { PerformanceChart } from "@/components/PerformanceChart";
import { TaskOverview } from "@/components/TaskOverview";
import { AlertsPanel } from "@/components/AlertsPanel";
import { IncentivesPanel } from "@/components/IncentivesPanel";
import { PerformanceIndicators } from "@/components/PerformanceIndicators";
import { HealthIndicators } from "@/components/HealthIndicators";
import { DateRangePicker } from "@/components/DateRangePicker";
import { StatsCard } from "@/components/StatsCard";
import { ActivityItem } from "@/components/ActivityItem";
import { PerformanceMetric } from "@/components/PerformanceMetric";
import { DashboardHeader } from "@/components/DashboardHeader";
import { BottomNavigation } from "@/components/BottomNavigation";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 1),
    to: new Date(2025, 4, 28),
  });

  // Memoized data to prevent unnecessary re-renders
  const facilitatorStats = useMemo(() => ({
    totalAshas: 20,
    activeToday: 18,
    completedTasks: 142,
    pendingTasks: 23,
    averageRating: 4.6
  }), []);

  const recentActivities = useMemo(() => [
    { id: 1, asha: "Priya Sharma", action: "Completed health checkup", time: "2 hours ago", type: "success" as const },
    { id: 2, asha: "Meera Devi", action: "Submitted monthly report", time: "4 hours ago", type: "info" as const },
    { id: 3, asha: "Lakshmi K", action: "Missed scheduled visit", time: "6 hours ago", type: "warning" as const },
    { id: 4, asha: "Sunita Yadav", action: "Updated beneficiary data", time: "8 hours ago", type: "success" as const }
  ], []);

  const overallPerformanceData = useMemo(() => ({
    completionRate: 86,
    timelyDelivery: 78,
    beneficiaryReach: 92,
    qualityScore: 84,
    monthlyTrend: 5.2,
    activeDays: 28,
    totalBeneficiaries: 1250,
    overdueActivities: 12
  }), []);

  const teamHealthMetrics = useMemo(() => ({
    totalRegistrations: 145,
    firstTrimesterCases: { total: 32, registered: 28 },
    lastMonthDeliveries: { total: 18, institutional: 16 },
    deliveryOutcomes: {
      liveBirths: 17,
      stillBirths: 1,
      timelyBreastfeeding: 15,
      cordInfections: 1,
      weakNewborns: 2
    },
    abortions: 3,
    lastTrimesterCases: { total: 22, birthPreparedness: 19 },
    deaths: { maternal: 0, child: 1 }
  }), []);

  const statsCards = useMemo(() => [
    {
      title: "Total ASHAs",
      value: facilitatorStats.totalAshas,
      icon: Users,
      gradient: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      title: "Active Today",
      value: facilitatorStats.activeToday,
      icon: Activity,
      gradient: "bg-gradient-to-r from-green-500 to-green-600"
    },
    {
      title: "Completed",
      value: facilitatorStats.completedTasks,
      icon: CheckCircle,
      gradient: "bg-gradient-to-r from-purple-500 to-purple-600"
    },
    {
      title: "Pending",
      value: facilitatorStats.pendingTasks,
      icon: Clock,
      gradient: "bg-gradient-to-r from-orange-500 to-orange-600"
    }
  ], [facilitatorStats]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <DashboardHeader 
        title="m-ASHA Dashboard"
        subtitle="ASHA Facilitator Portal"
      />

      <main className="p-4 pb-20">
        {/* Date Range Filter */}
        <Card className="mb-6 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="h-5 w-5 text-indigo-600" />
              Filter ASHA Performance by Date Range
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DateRangePicker 
              date={dateRange} 
              onDateChange={setDateRange}
            />
            {dateRange?.from && dateRange?.to && (
              <p className="text-sm text-gray-600 mt-2">
                Showing data from {dateRange.from.toLocaleDateString()} to {dateRange.to.toLocaleDateString()}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {statsCards.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              gradient={stat.gradient}
            />
          ))}
        </div>

        {/* Health Indicators */}
        <Card className="mb-6 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="h-5 w-5 text-red-500" />
              Team Health Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <HealthIndicators data={teamHealthMetrics} showTrend={true} />
          </CardContent>
        </Card>

        {/* Performance Indicators */}
        <Card className="mb-6 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Team Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceIndicators data={overallPerformanceData} />
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card className="mb-6 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <PerformanceMetric
                label="Overall Completion Rate"
                value={86}
              />
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Average Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{facilitatorStats.averageRating}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="ashas" className="text-xs">ASHAs</TabsTrigger>
            <TabsTrigger value="tasks" className="text-xs">Tasks</TabsTrigger>
            <TabsTrigger value="incentives" className="text-xs">Incentives</TabsTrigger>
            <TabsTrigger value="alerts" className="text-xs">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <PerformanceChart />
            
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ashas">
            <AshaList />
          </TabsContent>

          <TabsContent value="tasks">
            <TaskOverview />
          </TabsContent>

          <TabsContent value="incentives">
            <IncentivesPanel />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertsPanel />
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Index;
