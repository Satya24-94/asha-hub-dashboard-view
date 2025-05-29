
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
  Star,
  Shield,
  Stethoscope
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
      gradient: "health-primary text-white"
    },
    {
      title: "Active Today",
      value: facilitatorStats.activeToday,
      icon: Activity,
      gradient: "health-secondary text-white"
    },
    {
      title: "Completed",
      value: facilitatorStats.completedTasks,
      icon: CheckCircle,
      gradient: "health-accent text-white"
    },
    {
      title: "Pending",
      value: facilitatorStats.pendingTasks,
      icon: Clock,
      gradient: "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
    }
  ], [facilitatorStats]);

  return (
    <div className="min-h-screen health-gradient health-pattern">
      <DashboardHeader 
        title="ASHA Facilitator Dashboard"
        subtitle="Community Health Management Portal"
      />

      <main className="p-4 pb-20 max-w-7xl mx-auto">
        {/* Welcome Banner */}
        <div className="mb-6 relative overflow-hidden">
          <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200 shadow-lg asha-silhouette">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-full shadow-md">
                  <Shield className="h-8 w-8 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-emerald-800 mb-1">Welcome back!</h2>
                  <p className="text-emerald-700">Empowering communities through quality healthcare</p>
                  <p className="text-sm text-emerald-600 mt-1">Manage your ASHA team and track health outcomes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Date Range Filter */}
        <Card className="mb-6 shadow-md border-emerald-100 health-card-gradient">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg text-emerald-800">
              <Filter className="h-5 w-5 text-emerald-600" />
              Performance Analytics Period
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DateRangePicker 
              date={dateRange} 
              onDateChange={setDateRange}
            />
            {dateRange?.from && dateRange?.to && (
              <div className="flex items-center gap-2 mt-3 p-2 bg-emerald-50 rounded-lg">
                <Stethoscope className="h-4 w-4 text-emerald-600" />
                <p className="text-sm text-emerald-700">
                  Analyzing data from {dateRange.from.toLocaleDateString()} to {dateRange.to.toLocaleDateString()}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
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

        {/* Health Impact Summary */}
        <Card className="mb-6 shadow-md border-blue-100">
          <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardTitle className="flex items-center gap-2 text-lg text-blue-800">
              <Heart className="h-5 w-5 text-red-500" />
              Community Health Impact
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <HealthIndicators data={teamHealthMetrics} showTrend={true} />
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card className="mb-6 shadow-md border-emerald-100">
          <CardHeader className="pb-3 bg-gradient-to-r from-emerald-50 to-green-50">
            <CardTitle className="flex items-center gap-2 text-lg text-emerald-800">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              Team Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <PerformanceIndicators data={overallPerformanceData} />
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="mb-6 shadow-md border-cyan-100">
          <CardHeader className="pb-3 bg-gradient-to-r from-cyan-50 to-blue-50">
            <CardTitle className="flex items-center gap-2 text-lg text-cyan-800">
              <TrendingUp className="h-5 w-5 text-cyan-600" />
              Key Performance Indicators
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              <PerformanceMetric
                label="Overall Completion Rate"
                value={86}
              />
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <span className="text-sm font-medium text-yellow-800">Team Average Rating</span>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold text-yellow-800">{facilitatorStats.averageRating}</span>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Excellent</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Tabs */}
        <Card className="shadow-lg border-slate-200">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b bg-gradient-to-r from-slate-50 to-gray-50">
              <TabsList className="grid w-full grid-cols-5 bg-transparent h-auto p-1">
                <TabsTrigger 
                  value="overview" 
                  className="text-xs data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="ashas" 
                  className="text-xs data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm"
                >
                  ASHAs
                </TabsTrigger>
                <TabsTrigger 
                  value="tasks" 
                  className="text-xs data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm"
                >
                  Tasks
                </TabsTrigger>
                <TabsTrigger 
                  value="incentives" 
                  className="text-xs data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm"
                >
                  Incentives
                </TabsTrigger>
                <TabsTrigger 
                  value="alerts" 
                  className="text-xs data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm"
                >
                  Alerts
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-4 p-4">
              <PerformanceChart />
              
              <Card className="shadow-md border-slate-100">
                <CardHeader className="pb-3 bg-gradient-to-r from-slate-50 to-gray-50">
                  <CardTitle className="text-lg text-slate-800">Recent Activities</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {recentActivities.map((activity) => (
                      <ActivityItem key={activity.id} activity={activity} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ashas" className="p-4">
              <AshaList />
            </TabsContent>

            <TabsContent value="tasks" className="p-4">
              <TaskOverview />
            </TabsContent>

            <TabsContent value="incentives" className="p-4">
              <IncentivesPanel />
            </TabsContent>

            <TabsContent value="alerts" className="p-4">
              <AlertsPanel />
            </TabsContent>
          </Tabs>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Index;
