import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Heart, 
  Calendar, 
  TrendingUp, 
  MapPin, 
  Phone, 
  Star,
  Activity,
  CheckCircle,
  Clock,
  DollarSign,
  Baby,
  Stethoscope,
  Syringe,
  FileText,
  Home,
  Target
} from "lucide-react";
import { PerformanceIndicators } from "@/components/PerformanceIndicators";
import { HealthIndicators } from "@/components/HealthIndicators";

const AshaDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("2024-01");
  const [activeTab, setActiveTab] = useState("overview");

  // ASHA profile data
  const ashaProfile = {
    name: "Priya Sharma",
    village: "Rampur Village",
    district: "Sitapur",
    state: "Uttar Pradesh",
    phone: "+91 9876543210",
    joinDate: "June 2020",
    rating: 4.8,
    facilitator: "Dr. Sunita Gupta"
  };

  // Services provided by ASHA with incentive rates (based on actual ASHA guidelines)
  const services = [
    {
      id: 1,
      name: "Institutional Delivery",
      category: "Maternal Health",
      incentive: 600,
      icon: Baby,
      description: "Escort pregnant woman to facility for delivery",
      completed: 8,
      target: 10
    },
    {
      id: 2,
      name: "Antenatal Care (ANC)",
      category: "Maternal Health", 
      incentive: 100,
      icon: Heart,
      description: "4+ ANC visits facilitation",
      completed: 15,
      target: 20
    },
    {
      id: 3,
      name: "Immunization Sessions",
      category: "Child Health",
      incentive: 150,
      icon: Syringe,
      description: "Routine immunization support",
      completed: 25,
      target: 30
    },
    {
      id: 4,
      name: "Home Based Newborn Care",
      category: "Child Health",
      incentive: 250,
      icon: Baby,
      description: "7 home visits for newborn care",
      completed: 12,
      target: 15
    },
    {
      id: 5,
      name: "Family Planning Counseling",
      category: "Family Planning",
      incentive: 75,
      icon: Users,
      description: "Contraceptive counseling and distribution",
      completed: 20,
      target: 25
    },
    {
      id: 6,
      name: "TB DOT Support",
      category: "Communicable Disease",
      incentive: 1000,
      icon: Stethoscope,
      description: "Directly Observed Treatment for TB patient",
      completed: 3,
      target: 5
    },
    {
      id: 7,
      name: "Malaria Testing & Treatment",
      category: "Communicable Disease",
      incentive: 75,
      icon: Activity,
      description: "RDT testing and treatment for malaria",
      completed: 18,
      target: 20
    },
    {
      id: 8,
      name: "Community Health Meetings",
      category: "Community Mobilization",
      incentive: 150,
      icon: Users,
      description: "Monthly VHSND meetings",
      completed: 4,
      target: 4
    }
  ];

  const months = [
    { value: "2024-01", label: "January 2024" },
    { value: "2023-12", label: "December 2023" },
    { value: "2023-11", label: "November 2023" },
    { value: "2023-10", label: "October 2023" }
  ];

  // Calculate total incentives earned
  const totalIncentivesEarned = services.reduce((total, service) => {
    return total + (service.completed * service.incentive);
  }, 0);

  const totalServicesCompleted = services.reduce((total, service) => total + service.completed, 0);
  const totalTargets = services.reduce((total, service) => total + service.target, 0);
  const completionRate = Math.round((totalServicesCompleted / totalTargets) * 100);

  // Sample performance data for individual ASHA
  const personalPerformanceData = {
    completionRate: 89,
    timelyDelivery: 85,
    beneficiaryReach: 94,
    qualityScore: 88,
    monthlyTrend: 3.8,
    activeDays: 26,
    totalBeneficiaries: 85,
    overdueActivities: 2
  };

  // Personal health metrics for individual ASHA
  const personalHealthMetrics = {
    totalRegistrations: 12,
    firstTrimesterCases: {
      total: 8,
      registered: 7
    },
    lastMonthDeliveries: {
      total: 3,
      institutional: 3
    },
    deliveryOutcomes: {
      liveBirths: 3,
      stillBirths: 0,
      timelyBreastfeeding: 3,
      cordInfections: 0,
      weakNewborns: 0
    },
    abortions: 1,
    lastTrimesterCases: {
      total: 5,
      birthPreparedness: 4
    },
    deaths: {
      maternal: 0,
      child: 0
    }
  };

  const getCompletionColor = (completed: number, target: number) => {
    const percentage = (completed / target) * 100;
    if (percentage >= 100) return "text-green-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "Maternal Health": return "bg-pink-100 text-pink-800";
      case "Child Health": return "bg-blue-100 text-blue-800";
      case "Family Planning": return "bg-purple-100 text-purple-800";
      case "Communicable Disease": return "bg-red-100 text-red-800";
      case "Community Mobilization": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">My ASHA Dashboard</h1>
              <p className="text-sm text-gray-600">{ashaProfile.name}</p>
            </div>
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-pink-500 text-white">PS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 pb-20">
        {/* Profile Card */}
        <Card className="mb-6 shadow-md bg-gradient-to-r from-pink-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 border-2 border-white">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-white text-pink-600 text-xl font-bold">PS</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-lg font-bold">{ashaProfile.name}</h2>
                <div className="flex items-center space-x-1 text-pink-100">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{ashaProfile.village}</span>
                </div>
                <div className="flex items-center space-x-1 text-pink-100">
                  <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                  <span className="text-sm font-medium">{ashaProfile.rating} Rating</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Month Filter */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Performance Summary</h3>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Health Indicators */}
        <Card className="mb-6 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="h-5 w-5 text-red-500" />
              My Health Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <HealthIndicators data={personalHealthMetrics} isPersonal={true} />
          </CardContent>
        </Card>

        {/* Performance Indicators */}
        <Card className="mb-6 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">My Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceIndicators data={personalPerformanceData} isPersonal={true} />
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <DollarSign className="h-8 w-8 opacity-80" />
                <div>
                  <p className="text-green-100 text-sm">Total Earned</p>
                  <p className="text-xl font-bold">₹{totalIncentivesEarned.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-8 w-8 opacity-80" />
                <div>
                  <p className="text-blue-100 text-sm">Completion Rate</p>
                  <p className="text-xl font-bold">{completionRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Activity className="h-8 w-8 opacity-80" />
                <div>
                  <p className="text-purple-100 text-sm">Services Done</p>
                  <p className="text-xl font-bold">{totalServicesCompleted}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Target className="h-8 w-8 opacity-80" />
                <div>
                  <p className="text-orange-100 text-sm">Target</p>
                  <p className="text-xl font-bold">{totalTargets}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services List */}
        <Card className="mb-6 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">My Services & Incentives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div key={service.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <IconComponent className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900">{service.name}</h4>
                          <span className="font-bold text-green-600">₹{service.incentive}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={getCategoryBadgeColor(service.category)}>
                            {service.category}
                          </Badge>
                          <span className={`text-sm font-medium ${getCompletionColor(service.completed, service.target)}`}>
                            {service.completed}/{service.target} completed
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Progress</span>
                            <span>{Math.round((service.completed / service.target) * 100)}%</span>
                          </div>
                          <Progress 
                            value={(service.completed / service.target) * 100} 
                            className="h-2"
                          />
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <span className="font-medium">Earned: ₹{(service.completed * service.incentive).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">{ashaProfile.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">Facilitator: {ashaProfile.facilitator}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">Joined: {ashaProfile.joinDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="grid grid-cols-4 py-2">
          <Button variant="ghost" className="flex flex-col items-center py-3 h-auto">
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs">Home</span>
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
            <Activity className="h-5 w-5 mb-1" />
            <span className="text-xs">Reports</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AshaDashboard;
