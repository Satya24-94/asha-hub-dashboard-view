
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
import { MaternalHealthModule } from "@/components/modules/MaternalHealthModule";
import { ChildHealthModule } from "@/components/modules/ChildHealthModule";
import { ReferralTrackingModule } from "@/components/modules/ReferralTrackingModule";
import { AshaFunctionalityModule } from "@/components/modules/AshaFunctionalityModule";
import { AshaList } from "@/components/AshaList";
import { StatsCard } from "@/components/StatsCard";

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
    completionRate: 87.5,
    totalBeneficiaries: 1845,
    monthlyTrend: 5.2
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Heart className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ASHA Facilitator Dashboard</h1>
                <p className="text-sm text-gray-600">Community Health Management Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-xs text-gray-500">ASHA Facilitator</p>
                <p className="text-sm font-medium text-gray-900">{profile?.full_name}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="smooth-transition">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome back, {profile?.full_name}!</h2>
              <p className="text-gray-600">Managing health outcomes for {profile?.block} block</p>
              <p className="text-sm text-gray-500 mt-1">Monitor and support your ASHA team's performance</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard
            title="Total ASHAs"
            value={facilitatorStats.totalAshas}
            icon={Users}
            gradient="blue-gradient"
          />
          <StatsCard
            title="Active ASHAs"
            value={facilitatorStats.activeAshas}
            icon={Activity}
            gradient="green-gradient"
          />
          <StatsCard
            title="Completion Rate"
            value={`${facilitatorStats.completionRate}%`}
            icon={TrendingUp}
            gradient="purple-gradient"
          />
          <StatsCard
            title="Beneficiaries"
            value={facilitatorStats.totalBeneficiaries.toLocaleString()}
            icon={Heart}
            gradient="pink-gradient"
          />
        </div>

        {/* Main Content Tabs */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b bg-gray-50">
              <TabsList className="grid w-full grid-cols-5 bg-transparent h-12 p-0">
                <TabsTrigger 
                  value="ashas" 
                  className="data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm flex items-center gap-2 h-full"
                >
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">ASHA Team</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="maternal" 
                  className="data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm flex items-center gap-2 h-full"
                >
                  <Baby className="h-4 w-4" />
                  <span className="hidden sm:inline">Maternal</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="child" 
                  className="data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm flex items-center gap-2 h-full"
                >
                  <Heart className="h-4 w-4" />
                  <span className="hidden sm:inline">Child Health</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="referrals" 
                  className="data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm flex items-center gap-2 h-full"
                >
                  <Activity className="h-4 w-4" />
                  <span className="hidden sm:inline">Referrals</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="functionality" 
                  className="data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm flex items-center gap-2 h-full"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">Tasks</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="ashas" className="p-6">
              <AshaList />
            </TabsContent>

            <TabsContent value="maternal" className="p-6">
              <MaternalHealthModule />
            </TabsContent>

            <TabsContent value="child" className="p-6">
              <ChildHealthModule />
            </TabsContent>

            <TabsContent value="referrals" className="p-6">
              <ReferralTrackingModule />
            </TabsContent>

            <TabsContent value="functionality" className="p-6">
              <AshaFunctionalityModule />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};
