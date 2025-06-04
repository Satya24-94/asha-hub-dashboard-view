import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Users, 
  Heart, 
  Baby, 
  Stethoscope,
  Calendar,
  TrendingUp,
  Award,
  Target,
  Activity
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'overdue';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  category: string;
  progress: number;
  assignedTo?: string;
}

interface AshaFunctionalityModuleProps {
  isPersonal?: boolean;
}

export const AshaFunctionalityModule = ({ isPersonal = false }: AshaFunctionalityModuleProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample task data
  const tasks: Task[] = [
    {
      id: '1',
      title: 'Maternal Health Checkups',
      description: 'Conduct routine checkups for 15 pregnant women in the village',
      status: 'completed',
      priority: 'high',
      dueDate: '2024-01-15',
      category: 'Maternal Health',
      progress: 100,
      assignedTo: 'Priya Sharma'
    },
    {
      id: '2',
      title: 'Child Immunization Drive',
      description: 'Organize immunization for children aged 0-5 years',
      status: 'pending',
      priority: 'high',
      dueDate: '2024-01-20',
      category: 'Child Health',
      progress: 65,
      assignedTo: 'Meera Devi'
    },
    {
      id: '3',
      title: 'Community Health Education',
      description: 'Conduct health awareness session on hygiene and sanitation',
      status: 'pending',
      priority: 'medium',
      dueDate: '2024-01-18',
      category: 'Community Health',
      progress: 30,
      assignedTo: 'Lakshmi K'
    },
    {
      id: '4',
      title: 'Data Collection and Reporting',
      description: 'Submit monthly health survey data to block office',
      status: 'overdue',
      priority: 'high',
      dueDate: '2024-01-10',
      category: 'Administrative',
      progress: 80,
      assignedTo: 'Sunita Yadav'
    },
    {
      id: '5',
      title: 'Elderly Health Screening',
      description: 'Check blood pressure and diabetes for elderly residents',
      status: 'pending',
      priority: 'medium',
      dueDate: '2024-01-25',
      category: 'General Health',
      progress: 20,
      assignedTo: 'Radha Singh'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'low':
        return <Badge className="bg-blue-100 text-blue-800">Low</Badge>;
      default:
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Maternal Health':
        return <Baby className="h-4 w-4 text-pink-600" />;
      case 'Child Health':
        return <Heart className="h-4 w-4 text-red-600" />;
      case 'Community Health':
        return <Users className="h-4 w-4 text-blue-600" />;
      case 'General Health':
        return <Stethoscope className="h-4 w-4 text-purple-600" />;
      case 'Administrative':
        return <Activity className="h-4 w-4 text-gray-600" />;
      default:
        return <Target className="h-4 w-4 text-gray-400" />;
    }
  };

  // Task statistics
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const overdueTasks = tasks.filter(task => task.status === 'overdue').length;
  const totalTasks = tasks.length;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {isPersonal ? 'My Tasks & Activities' : 'ASHA Tasks Management'}
              </h2>
              <p className="text-gray-600">
                {isPersonal 
                  ? 'Track your daily activities and health service tasks'
                  : 'Monitor and manage ASHA worker tasks and performance'
                }
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-blue-600">{completionRate}%</p>
            <p className="text-sm text-gray-600">Overall Completion</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="asha-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{totalTasks}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Total Tasks</h3>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card className="asha-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-700">{completedTasks}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Completed</h3>
            <p className="text-xs text-gray-500 mt-1">{completionRate}% completion rate</p>
          </CardContent>
        </Card>

        <Card className="asha-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <span className="text-2xl font-bold text-yellow-700">{pendingTasks}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">In Progress</h3>
            <p className="text-xs text-gray-500 mt-1">Active tasks</p>
          </CardContent>
        </Card>

        <Card className="asha-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <span className="text-2xl font-bold text-red-700">{overdueTasks}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Overdue</h3>
            <p className="text-xs text-gray-500 mt-1">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Task Management Tabs */}
      <Card className="asha-card">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b bg-gray-50">
            <TabsList className="grid w-full grid-cols-4 bg-transparent h-12 p-0">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm h-full"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="active" 
                className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm h-full"
              >
                Active Tasks
              </TabsTrigger>
              <TabsTrigger 
                value="completed" 
                className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm h-full"
              >
                Completed
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm h-full"
              >
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">All Tasks Overview</h3>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <Card key={task.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          {getCategoryIcon(task.category)}
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{task.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                              {task.assignedTo && (
                                <>
                                  <span>•</span>
                                  <span>Assigned to: {task.assignedTo}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(task.status)}
                          {getStatusBadge(task.status)}
                          {getPriorityBadge(task.priority)}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="active" className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Active Tasks</h3>
              {tasks.filter(task => task.status === 'pending').map((task) => (
                <Card key={task.id} className="border border-yellow-200 bg-yellow-50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        {getCategoryIcon(task.category)}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{task.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                        </div>
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Update Progress
                      </Button>
                    </div>
                    <Progress value={task.progress} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Completed Tasks</h3>
              {tasks.filter(task => task.status === 'completed').map((task) => (
                <Card key={task.id} className="border border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{task.title}</h4>
                        <p className="text-sm text-gray-600">{task.description}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        <Award className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="p-6">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Performance Analytics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Task Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {['Maternal Health', 'Child Health', 'Community Health', 'General Health', 'Administrative'].map((category) => {
                      const categoryTasks = tasks.filter(task => task.category === category);
                      const percentage = Math.round((categoryTasks.length / totalTasks) * 100);
                      return (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{category}</span>
                            <span>{categoryTasks.length} tasks ({percentage}%)</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Monthly Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">Completion Rate</span>
                        </div>
                        <span className="text-xl font-bold text-blue-600">{completionRate}%</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-green-600" />
                          <span className="font-medium">Quality Score</span>
                        </div>
                        <span className="text-xl font-bold text-green-600">87%</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-purple-600" />
                          <span className="font-medium">People Served</span>
                        </div>
                        <span className="text-xl font-bold text-purple-600">1,247</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
