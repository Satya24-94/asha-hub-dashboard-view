
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Users,
  Stethoscope,
  Baby,
  FileText
} from "lucide-react";

export const TaskOverview = () => {
  const tasks = [
    {
      id: 1,
      title: "Monthly Health Checkups",
      description: "Conduct routine health checkups for pregnant women",
      assignedTo: "Priya Sharma, Meera Devi",
      dueDate: "2024-01-28",
      priority: "high",
      status: "in-progress",
      progress: 75,
      icon: Stethoscope,
      category: "Health"
    },
    {
      id: 2,
      title: "Immunization Drive",
      description: "Complete childhood immunization for under-5 children",
      assignedTo: "Lakshmi K, Sunita Yadav",
      dueDate: "2024-01-30",
      priority: "medium",
      status: "pending",
      progress: 45,
      icon: Baby,
      category: "Immunization"
    },
    {
      id: 3,
      title: "Data Collection Survey",
      description: "Collect beneficiary data for quarterly report",
      assignedTo: "All ASHAs",
      dueDate: "2024-01-25",
      priority: "high",
      status: "overdue",
      progress: 30,
      icon: FileText,
      category: "Survey"
    },
    {
      id: 4,
      title: "Community Awareness Program",
      description: "Conduct awareness session on maternal health",
      assignedTo: "Priya Sharma",
      dueDate: "2024-02-02",
      priority: "low",
      status: "completed",
      progress: 100,
      icon: Users,
      category: "Education"
    }
  ];

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: "bg-red-100 text-red-800 border-red-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-green-100 text-green-800 border-green-200"
    };
    return <Badge className={variants[priority as keyof typeof variants]}>{priority}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      "completed": "bg-green-100 text-green-800 border-green-200",
      "in-progress": "bg-blue-100 text-blue-800 border-blue-200",
      "pending": "bg-gray-100 text-gray-800 border-gray-200",
      "overdue": "bg-red-100 text-red-800 border-red-200"
    };
    return <Badge className={variants[status as keyof typeof variants]}>{status.replace('-', ' ')}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "overdue":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Task Summary */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 opacity-80" />
              <div>
                <p className="text-green-100 text-sm">Completed</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 opacity-80" />
              <div>
                <p className="text-red-100 text-sm">Overdue</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task) => {
          const IconComponent = task.icon;
          return (
            <Card key={task.id} className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <IconComponent className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Users className="h-3 w-3" />
                        <span>{task.assignedTo}</span>
                      </div>
                    </div>
                  </div>
                  {getStatusIcon(task.status)}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Due: {task.dueDate}</span>
                  </div>
                  <div className="flex space-x-2">
                    {getPriorityBadge(task.priority)}
                    {getStatusBadge(task.status)}
                  </div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <Button size="sm" variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1">
                    Update Status
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
