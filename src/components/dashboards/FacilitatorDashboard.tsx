
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Heart, 
  Activity,
  TrendingUp,
  Baby,
  LogOut,
  Calendar
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { DashboardHeader } from "@/components/DashboardHeader";
import { BottomNavigation } from "@/components/BottomNavigation";
import { MaternalHealthModule } from "@/components/modules/MaternalHealthModule";
import { ChildHealthModule } from "@/components/modules/ChildHealthModule";
import { ReferralTrackingModule } from "@/components/modules/ReferralTrackingModule";
import { AshaFunctionalityModule } from "@/components/modules/AshaFunctionalityModule";
import { AshaList } from "@/components/AshaList";
import { InteractiveCard } from "@/components/InteractiveCard";

export const FacilitatorDashboard = () => {
  const [activeTab, setActiveTab] = useState("ashas");
  const { profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  // Sample data for the facilitator overview
  const facilitatorStats = {
    totalAshas: 20,
    activeAshas: 17,
    completionRate: 87,
    totalBeneficiaries: 1845,
    monthlyTrend: 5.2
  };

  return (
    <div className="min-h-screen health-gradient health-pattern">
      <div className="bg-white shadow-sm border-b border-emerald-100 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-full">
                <Heart className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-emerald-800">ASHA Facilitator Dashboard</h1>
                <p className="text-sm text-emerald-600">Community Health Management Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-xs text-emerald-600">ASHA Facilitator</p>
                <p className="text-sm font-medium text-emerald-800">{profile?.full_name}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="p-4 pb-20 max-w-7xl mx-auto">
        {/* Welcome Banner */}
        <div className="mb-6 relative overflow-hidden animate-fade-in">
          <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-full shadow-md">
                  <Users className="h-8 w-8 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-emerald-800 mb-1">Welcome back, {profile?.full_name}!</h2>
                  <p className="text-emerald-700">Managing health outcomes for {profile?.block} block</p>
                  <p className="text-sm text-emerald-600 mt-1">Monitor and support your ASHA team's performance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <InteractiveCard
            title="Total ASHAs"
            value={facilitatorStats.totalAshas}
            trend={2.1}
            description="ASHA workers under supervision"
            icon={Users}
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white"
          />
          <InteractiveCard
            title="Active ASHAs"
            value={facilitatorStats.activeAshas}
            target={facilitatorStats.totalAshas}
            trend={facilitatorStats.monthlyTrend}
            description="Currently active workers"
            icon={Activity}
            className="bg-gradient-to-br from-green-500 to-green-600 text-white"
          />
          <InteractiveCard
            title="Completion Rate"
            value={facilitatorStats.completionRate}
            target={100}
            trend={3.8}
            description="Overall task completion"
            icon={TrendingUp}
            className="bg-gradient-to-br from-purple-500 to-purple-600 text-white"
          />
          <InteractiveCard
            title="Beneficiaries"
            value={facilitatorStats.totalBeneficiaries}
            trend={7.3}
            description="Total people served"
            icon={Heart}
            className="bg-gradient-to-br from-pink-500 to-pink-600 text-white"
          />
        </div>

        {/* Main Dashboard Modules */}
        <Card className="shadow-lg border-slate-200">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b bg-gradient-to-r from-slate-50 to-gray-50">
              <TabsList className="grid w-full grid-cols-5 bg-transparent h-auto p-1">
                <TabsTrigger 
                  value="ashas" 
                  className="text-xs data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm flex items-center gap-1"
                >
                  <Users className="h-4 w-4" />
                  ASHA Team
                </TabsTrigger>
                <TabsTrigger 
                  value="maternal" 
                  className="text-xs data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm flex items-center gap-1"
                >
                  <Baby className="h-4 w-4" />
                  Maternal Health
                </TabsTrigger>
                <TabsTrigger 
                  value="child" 
                  className="text-xs data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm flex items-center gap-1"
                >
                  <Heart className="h-4 w-4" />
                  Child Health
                </TabsTrigger>
                <TabsTrigger 
                  value="referrals" 
                  className="text-xs data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm flex items-center gap-1"
                >
                  <Activity className="h-4 w-4" />
                  Referrals
                </TabsTrigger>
                <TabsTrigger 
                  value="functionality" 
                  className="text-xs data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm flex items-center gap-1"
                >
                  <TrendingUp className="h-4 w-4" />
                  ASHA Tasks
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="ashas" className="p-4">
              <AshaList />
            </TabsContent>

            <TabsContent value="maternal" className="p-4">
              <MaternalHealthModule />
            </TabsContent>

            <TabsContent value="child" className="p-4">
              <ChildHealthModule />
            </TabsContent>

            <TabsContent value="referrals" className="p-4">
              <ReferralTrackingModule />
            </TabsContent>

            <TabsContent value="functionality" className="p-4">
              <AshaFunctionalityModule />
            </TabsContent>
          </Tabs>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
};
