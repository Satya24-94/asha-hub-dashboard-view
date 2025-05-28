import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { DateRange } from "react-day-picker";
import { 
  Users, 
  Heart, 
  Calendar, 
  TrendingUp, 
  MapPin, 
  Phone, 
  Star,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Filter
} from "lucide-react";
import { AshaList } from "@/components/AshaList";
import { PerformanceChart } from "@/components/PerformanceChart";
import { TaskOverview } from "@/components/TaskOverview";
import { AlertsPanel } from "@/components/AlertsPanel";
import { IncentivesPanel } from "@/components/IncentivesPanel";
import { PerformanceIndicators } from "@/components/PerformanceIndicators";
import { HealthIndicators } from "@/components/HealthIndicators";
import { DateRangePicker } from "@/components/DateRangePicker";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 1), // January 1, 2025
    to: new Date(2025, 4, 28), // May 28, 2025 (current date)
  });

  const facilitorStats = {
    totalAshas: 20,
    activeToday: 18,
    completedTasks: 142,
    pendingTasks: 23,
    averageRating: 4.6
  };

  const recentActivities = [
    { id: 1, asha: "Priya Sharma", action: "Completed health checkup", time: "2 hours ago", type: "success" },
    { id: 2, asha: "Meera Devi", action: "Submitted monthly report", time: "4 hours ago", type: "info" },
    { id: 3, asha: "Lakshmi K", action: "Missed scheduled visit", time: "6 hours ago", type: "warning" },
    { id: 4, asha: "Sunita Yadav", action: "Updated beneficiary data", time: "8 hours ago", type: "success" }
  ];

  // Sample performance data for the facilitator overview
  const overallPerformanceData = {
    completionRate: 86,
    timelyDelivery: 78,
    beneficiaryReach: 92,
    qualityScore: 84,
    monthlyTrend: 5.2,
    activeDays: 28,
    totalBeneficiaries: 1250,
    overdueActivities: 12
  };

  // Sample health metrics data for the facilitator dashboard (aggregated from all ASHAs)
  const teamHealthMetrics = {
    totalRegistrations: 145,
    firstTrimesterCases: {
      total: 32,
      registered: 28
    },
    lastMonthDeliveries: {
      total: 18,
      institutional: 16
    },
    deliveryOutcomes: {
      liveBirths: 17,
      stillBirths: 1,
      timelyBreastfeeding: 15,
      cordInfections: 1,
      weakNewborns: 2
    },
    abortions: 3,
    lastTrimesterCases: {
      total: 22,
      birthPreparedness: 19
    },
    deaths: {
      maternal: 0,
      child: 1
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">m-ASHA Dashboard</h1>
              <p className="text-sm text-gray-600">ASHA Facilitator Portal</p>
            </div>
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-indigo-500 text-white">AF</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 pb-20">
        {/* Date Range Filter */}
        <Card className="mb-6 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="h-5 w-5 text-indigo-600" />
              Filter ASHA Performance by Date Range
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <DateRangePicker 
                date={dateRange} 
                onDateChange={setDateRange}
              />
              <Button variant="outline" size="sm">
                Apply Filter
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setDateRange(undefined)}
              >
                Clear
              </Button>
            </div>
            {dateRange?.from && dateRange?.to && (
              <p className="text-sm text-gray-600 mt-2">
                Showing ASHA performance data from {dateRange.from.toLocaleDateString()} to {dateRange.to.toLocaleDateString()}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 opacity-80" />
                <div>
                  <p className="text-blue-100 text-sm">Total ASHAs</p>
                  <p className="text-2xl font-bold">{facilitorStats.totalAshas}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Activity className="h-8 w-8 opacity-80" />
                <div>
                  <p className="text-green-100 text-sm">Active Today</p>
                  <p className="text-2xl font-bold">{facilitorStats.activeToday}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-8 w-8 opacity-80" />
                <div>
                  <p className="text-purple-100 text-sm">Completed</p>
                  <p className="text-2xl font-bold">{facilitorStats.completedTasks}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Clock className="h-8 w-8 opacity-80" />
                <div>
                  <p className="text-orange-100 text-sm">Pending</p>
                  <p className="text-2xl font-bold">{facilitorStats.pendingTasks}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Indicators Section */}
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

        {/* Performance Indicators Section */}
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
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Overall Completion Rate</span>
                  <span className="text-sm text-gray-600">86%</span>
                </div>
                <Progress value={86} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Average Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{facilitorStats.averageRating}</span>
                  </div>
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
            
            {/* Recent Activities */}
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`h-2 w-2 rounded-full mt-2 ${
                        activity.type === 'success' ? 'bg-green-500' : 
                        activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.asha}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                    </div>
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
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="grid grid-cols-4 py-2">
          <Button variant="ghost" className="flex flex-col items-center py-3 h-auto">
            <Users className="h-5 w-5 mb-1" />
            <span className="text-xs">Dashboard</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center py-3 h-auto">
            <DollarSign className="h-5 w-5 mb-1" />
            <span className="text-xs">Incentives</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center py-3 h-auto">
            <Calendar className="h-5 w-5 mb-1" />
            <span className="text-xs">Schedule</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center py-3 h-auto">
            <MapPin className="h-5 w-5 mb-1" />
            <span className="text-xs">Locations</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
