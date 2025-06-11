
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Heart, 
  Activity,
  Baby,
  LogOut,
  User,
  TrendingUp,
  UserCheck,
  Plus
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { MaternalHealthModule } from "@/components/modules/MaternalHealthModule";
import { ChildHealthModule } from "@/components/modules/ChildHealthModule";
import { ReferralTrackingModule } from "@/components/modules/ReferralTrackingModule";
import { MobileDataEntry } from "@/components/mobile/MobileDataEntry";

export const AshaDashboard = () => {
  const [activeTab, setActiveTab] = useState("entry");
  const { profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Clean Header */}
      <div className="bg-white shadow-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 rounded-xl">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ASHA Dashboard</h1>
                <p className="text-sm text-gray-600">{profile?.village || 'Community'} Health Worker</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-pink-500 text-white font-semibold">
                  {profile?.full_name ? getInitials(profile.full_name) : 'AS'}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="border-gray-300 hover:bg-gray-50 text-gray-700">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Profile Card */}
        <Card className="shadow-sm bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 border-2 border-white">
                <AvatarFallback className="bg-white text-pink-600 text-xl font-bold">
                  {profile?.full_name ? getInitials(profile.full_name) : 'AS'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-lg font-bold">{profile?.full_name || 'ASHA Worker'}</h2>
                <p className="text-pink-100 text-sm font-medium">Accredited Social Health Activist</p>
                <p className="text-pink-100 text-sm">{profile?.village || 'Village'}, {profile?.block || 'Block'}</p>
                <p className="text-pink-100 text-sm">{profile?.district || 'District'}, {profile?.state || 'State'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Card className="shadow-sm border border-gray-200 rounded-2xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b bg-gray-50 rounded-t-2xl">
              <TabsList className="grid w-full grid-cols-4 bg-transparent h-14 p-1">
                <TabsTrigger 
                  value="entry" 
                  className="data-[state=active]:bg-white data-[state=active]:text-pink-700 data-[state=active]:shadow-sm flex items-center gap-2 h-full text-gray-700 font-medium rounded-lg"
                >
                  <Plus className="h-4 w-4" />
                  <span className="text-xs sm:text-sm">Add Data</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="maternal" 
                  className="data-[state=active]:bg-white data-[state=active]:text-pink-700 data-[state=active]:shadow-sm flex items-center gap-2 h-full text-gray-700 font-medium rounded-lg"
                >
                  <Baby className="h-4 w-4" />
                  <span className="text-xs sm:text-sm">Pregnant</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="child" 
                  className="data-[state=active]:bg-white data-[state=active]:text-pink-700 data-[state=active]:shadow-sm flex items-center gap-2 h-full text-gray-700 font-medium rounded-lg"
                >
                  <Heart className="h-4 w-4" />
                  <span className="text-xs sm:text-sm">Children</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="referrals" 
                  className="data-[state=active]:bg-white data-[state=active]:text-pink-700 data-[state=active]:shadow-sm flex items-center gap-2 h-full text-gray-700 font-medium rounded-lg"
                >
                  <Activity className="h-4 w-4" />
                  <span className="text-xs sm:text-sm">Referrals</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="entry" className="p-0">
              <MobileDataEntry />
            </TabsContent>

            <TabsContent value="maternal" className="p-6">
              <MaternalHealthModule isPersonal={true} />
            </TabsContent>

            <TabsContent value="child" className="p-6">
              <ChildHealthModule isPersonal={true} />
            </TabsContent>

            <TabsContent value="referrals" className="p-6">
              <ReferralTrackingModule isPersonal={true} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto grid grid-cols-4 py-2">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center py-3 h-auto text-gray-700 hover:bg-gray-50"
            onClick={() => setActiveTab("entry")}
          >
            <Plus className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Add Data</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center py-3 h-auto text-gray-700 hover:bg-gray-50"
            onClick={() => setActiveTab("maternal")}
          >
            <Baby className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Pregnant</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center py-3 h-auto text-gray-700 hover:bg-gray-50"
            onClick={() => setActiveTab("child")}
          >
            <Heart className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Children</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center py-3 h-auto text-gray-700 hover:bg-gray-50"
            onClick={() => setActiveTab("referrals")}
          >
            <Activity className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Referrals</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
