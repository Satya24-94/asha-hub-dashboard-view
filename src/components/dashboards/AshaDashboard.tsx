
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
  TrendingUp
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { MaternalHealthModule } from "@/components/modules/MaternalHealthModule";
import { ChildHealthModule } from "@/components/modules/ChildHealthModule";
import { ReferralTrackingModule } from "@/components/modules/ReferralTrackingModule";

export const AshaDashboard = () => {
  const [activeTab, setActiveTab] = useState("maternal");
  const { profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">My ASHA Dashboard</h1>
              <p className="text-sm text-gray-600">{profile?.village}, {profile?.block}</p>
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-pink-500 text-white">
                  {profile?.full_name ? getInitials(profile.full_name) : 'AS'}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="smooth-transition">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Profile Card */}
        <Card className="shadow-sm bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 border-2 border-white">
                <AvatarFallback className="bg-white text-pink-600 text-xl font-bold">
                  {profile?.full_name ? getInitials(profile.full_name) : 'AS'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-lg font-bold">{profile?.full_name}</h2>
                <p className="text-pink-100 text-sm">ASHA Worker</p>
                <p className="text-pink-100 text-sm">{profile?.village}, {profile?.block}</p>
                <p className="text-pink-100 text-sm">{profile?.district}, {profile?.state}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Modules */}
        <Card className="shadow-sm border">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b bg-gray-50">
              <TabsList className="grid w-full grid-cols-3 bg-transparent h-12 p-0">
                <TabsTrigger 
                  value="maternal" 
                  className="data-[state=active]:bg-white data-[state=active]:text-pink-700 data-[state=active]:shadow-sm flex items-center gap-2 h-full"
                >
                  <Baby className="h-4 w-4" />
                  Maternal
                </TabsTrigger>
                <TabsTrigger 
                  value="child" 
                  className="data-[state=active]:bg-white data-[state=active]:text-pink-700 data-[state=active]:shadow-sm flex items-center gap-2 h-full"
                >
                  <Heart className="h-4 w-4" />
                  Child
                </TabsTrigger>
                <TabsTrigger 
                  value="referrals" 
                  className="data-[state=active]:bg-white data-[state=active]:text-pink-700 data-[state=active]:shadow-sm flex items-center gap-2 h-full"
                >
                  <Activity className="h-4 w-4" />
                  Referrals
                </TabsTrigger>
              </TabsList>
            </div>

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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-4xl mx-auto grid grid-cols-4 py-2">
          <Button variant="ghost" className="flex flex-col items-center py-3 h-auto smooth-transition">
            <User className="h-5 w-5 mb-1" />
            <span className="text-xs">Profile</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center py-3 h-auto smooth-transition">
            <Heart className="h-5 w-5 mb-1" />
            <span className="text-xs">Health</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center py-3 h-auto smooth-transition">
            <Activity className="h-5 w-5 mb-1" />
            <span className="text-xs">Tasks</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center py-3 h-auto smooth-transition">
            <TrendingUp className="h-5 w-5 mb-1" />
            <span className="text-xs">Reports</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
