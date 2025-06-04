
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Users, 
  Heart,
  Baby,
  Activity,
  Calendar,
  Search,
  Filter,
  FileText,
  Download
} from 'lucide-react';

interface TaskData {
  id: string;
  title: string;
  description: string;
  category: 'maternal' | 'child' | 'community' | 'nutrition';
  priority: 'high' | 'medium' | 'low';
  status: 'completed' | 'pending' | 'overdue';
  dueDate: string;
  ashaName: string;
  village: string;
  beneficiaries: number;
}

export const AshaFunctionalityModule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Sample task data
  const tasks: TaskData[] = [
    {
      id: '1',
      title: 'Prenatal Care Visit',
      description: 'Conduct home visit for pregnant women - ANC checkup and health counseling',
      category: 'maternal',
      priority: 'high',
      status: 'completed',
      dueDate: '2024-06-01',
      ashaName: 'Priya Sharma',
      village: 'Rampur',
      beneficiaries: 15
    },
    {
      id: '2',
      title: 'Child Immunization Drive',
      description: 'Organize immunization campaign for children 12-23 months',
      category: 'child',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-06-05',
      ashaName: 'Meera Devi',
      village: 'Govindpur',
      beneficiaries: 25
    },
    {
      id: '3',
      title: 'VHND Session',
      description: 'Village Health and Nutrition Day - health screening and awareness',
      category: 'community',
      priority: 'medium',
      status: 'completed',
      dueDate: '2024-06-03',
      ashaName: 'Lakshmi K',
      village: 'Sundarganj',
      beneficiaries: 50
    },
    {
      id: '4',
      title: 'Nutrition Counseling',
      description: 'Counsel mothers on complementary feeding for 6-9 months children',
      category: 'nutrition',
      priority: 'medium',
      status: 'pending',
      dueDate: '2024-06-06',
      ashaName: 'Sunita Yadav',
      village: 'Krishnanagar',
      beneficiaries: 12
    },
    {
      id: '5',
      title: 'Newborn Care Visit',
      description: 'Home visit for newborn within 24 hours of birth',
      category: 'child',
      priority: 'high',
      status: 'overdue',
      dueDate: '2024-06-02',
      ashaName: 'Radha Singh',
      village: 'Shivpur',
      beneficiaries: 3
    },
    {
      id: '6',
      title: 'Family Planning Counseling',
      description: 'Provide family planning information and contraceptive distribution',
      category: 'maternal',
      priority: 'low',
      status: 'completed',
      dueDate: '2024-06-04',
      ashaName: 'Kavita Rani',
      village: 'Madhubani',
      beneficiaries: 8
    }
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.ashaName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.village.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'maternal':
        return <Heart className="h-4 w-4 text-pink-600" />;
      case 'child':
        return <Baby className="h-4 w-4 text-blue-600" />;
      case 'community':
        return <Users className="h-4 w-4 text-purple-600" />;
      case 'nutrition':
        return <Activity className="h-4 w-4 text-green-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    overdue: tasks.filter(t => t.status === 'overdue').length,
    beneficiaries: tasks.reduce((sum, task) => sum + task.beneficiaries, 0)
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">ASHA Functionality & Tasks</h2>
        <p className="text-sm text-gray-600">Track and manage ASHA activities and task completion</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-blue-700">{taskStats.total}</p>
            <p className="text-xs text-blue-600">Total Tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-green-700">{taskStats.completed}</p>
            <p className="text-xs text-green-600">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-yellow-700">{taskStats.pending}</p>
            <p className="text-xs text-yellow-600">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <AlertCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-red-700">{taskStats.overdue}</p>
            <p className="text-xs text-red-600">Overdue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-purple-700">{taskStats.beneficiaries}</p>
            <p className="text-xs text-purple-600">Beneficiaries</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-64 relative">
          <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          <Input
            placeholder="Search tasks or ASHA name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="maternal">Maternal</SelectItem>
            <SelectItem value="child">Child Health</SelectItem>
            <SelectItem value="community">Community</SelectItem>
            <SelectItem value="nutrition">Nutrition</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  {getCategoryIcon(task.category)}
                  <div>
                    <h3 className="font-semibold text-lg">{task.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {getStatusBadge(task.status)}
                  <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    {task.priority.toUpperCase()} PRIORITY
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {task.ashaName}
                  </span>
                  <span>{task.village}</span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {task.beneficiaries} beneficiaries
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">No tasks found matching your criteria.</p>
        </Card>
      )}
    </div>
  );
};
