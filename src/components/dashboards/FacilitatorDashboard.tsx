import React, { useState } from 'react';
import { AshaManagementDashboard } from '@/components/AshaManagementDashboard';
import { AshaFunctionalityModule } from '@/components/modules/AshaFunctionalityModule';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  TrendingUp, 
  Activity, 
  Target,
  ChevronRight,
  BarChart3,
  UserPlus,
  Calendar,
  CheckSquare
} from 'lucide-react';

export const FacilitatorDashboard = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');

  const facilitatorStats = [
    {
      id: 'total-ashas',
      title: 'Total ASHAs',
      value: 18,
      target: 20,
      change: '+2 this month',
      status: 'good',
      icon: Users,
      color: 'green'
    },
    {
      id: 'avg-performance',
      title: 'Avg Performance',
      value: 87,
      target: 90,
      change: '+5% this month',
      status: 'warning',
      icon: TrendingUp,
      color: 'blue'
    },
    {
      id: 'active-referrals',
      title: 'Active Referrals',
      value: 24,
      target: 30,
      change: '+8 this week',
      status: 'good',
      icon: Activity,
      color: 'orange'
    },
    {
      id: 'targets-met',
      title: 'Targets Met',
      value: 92,
      target: 95,
      change: '+3% this quarter',
      status: 'good',
      icon: Target,
      color: 'purple'
    }
  ];

  const recentActivities = [
    { id: 1, action: 'New ASHA added', name: 'Priya Sharma', time: '2 hours ago', type: 'success' },
    { id: 2, action: 'Performance review', name: 'Meera Devi', time: '4 hours ago', type: 'info' },
    { id: 3, action: 'Target achieved', name: 'Sunita Yadav', time: '1 day ago', type: 'success' },
    { id: 4, action: 'Training completed', name: 'Lakshmi K', time: '2 days ago', type: 'info' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'danger': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'green': return 'text-green-600 bg-green-100';
      case 'blue': return 'text-blue-600 bg-blue-100';
      case 'orange': return 'text-orange-600 bg-orange-100';
      case 'purple': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50/20">
      <div className="pt-20">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Facilitator Dashboard</h1>
            <p className="text-gray-600">Monitor and manage your ASHA network performance</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {facilitatorStats.map((stat) => {
              const IconComponent = stat.icon;
              const percentage = Math.round((stat.value / stat.target) * 100);
              
              return (
                <Card 
                  key={stat.id}
                  className={`transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer border-0 ${
                    hoveredCard === stat.id ? 'ring-2 ring-offset-2 ring-green-200 shadow-lg' : ''
                  } ${selectedMetric === stat.id ? 'bg-green-50 border-green-200' : 'bg-white'}`}
                  onMouseEnter={() => setHoveredCard(stat.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setSelectedMetric(selectedMetric === stat.id ? null : stat.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg transition-all duration-200 ${getIconColor(stat.color)} ${
                        hoveredCard === stat.id ? 'scale-110' : ''
                      }`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <Badge className={getStatusColor(stat.status)} variant="outline">
                        {percentage}%
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                        <span className="text-sm text-gray-500">/ {stat.target}</span>
                      </div>
                      <p className="text-xs text-green-600 font-medium">{stat.change}</p>
                    </div>

                    {selectedMetric === stat.id && (
                      <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              stat.status === 'good' ? 'bg-green-500' : 
                              stat.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <UserPlus className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Add New ASHA</p>
                      <p className="text-sm text-green-100">Expand your network</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/80" />
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">View Reports</p>
                      <p className="text-sm text-blue-100">Detailed analytics</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/80" />
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Schedule Training</p>
                      <p className="text-sm text-purple-100">Upcoming sessions</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/80" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card className="mb-8 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-all duration-200 hover:bg-gray-100 hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.name}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Dashboard Tabs */}
          <Card className="transition-all duration-300 hover:shadow-lg">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b bg-gray-50 rounded-t-lg">
                <TabsList className="grid w-full grid-cols-3 bg-transparent h-14 p-1">
                  <TabsTrigger 
                    value="overview" 
                    className="data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm flex items-center gap-2 h-full text-gray-700 font-medium rounded-lg transition-all duration-200 hover:bg-white/50"
                  >
                    <Users className="h-4 w-4" />
                    <span className="text-sm">ASHA Management</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tasks" 
                    className="data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm flex items-center gap-2 h-full text-gray-700 font-medium rounded-lg transition-all duration-200 hover:bg-white/50"
                  >
                    <CheckSquare className="h-4 w-4" />
                    <span className="text-sm">ASHA Tasks</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="analytics" 
                    className="data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm flex items-center gap-2 h-full text-gray-700 font-medium rounded-lg transition-all duration-200 hover:bg-white/50"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span className="text-sm">Analytics</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="p-0">
                <AshaManagementDashboard />
              </TabsContent>

              <TabsContent value="tasks" className="p-6">
                <AshaFunctionalityModule isPersonal={false} />
              </TabsContent>

              <TabsContent value="analytics" className="p-6">
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-600">Detailed analytics and reporting features coming soon.</p>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};
