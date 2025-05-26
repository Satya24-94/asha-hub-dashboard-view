
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Phone, 
  MapPin, 
  Star, 
  Calendar,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";

export const AshaList = () => {
  const ashas = [
    {
      id: 1,
      name: "Priya Sharma",
      village: "Rampur",
      phone: "+91 98765 43210",
      rating: 4.8,
      status: "active",
      tasksCompleted: 23,
      tasksPending: 2,
      lastActive: "2 hours ago",
      beneficiaries: 45
    },
    {
      id: 2,
      name: "Meera Devi",
      village: "Govindpur",
      phone: "+91 98765 43211",
      rating: 4.6,
      status: "active",
      tasksCompleted: 18,
      tasksPending: 3,
      lastActive: "4 hours ago",
      beneficiaries: 38
    },
    {
      id: 3,
      name: "Lakshmi K",
      village: "Sundarganj",
      phone: "+91 98765 43212",
      rating: 4.2,
      status: "inactive",
      tasksCompleted: 15,
      tasksPending: 5,
      lastActive: "1 day ago",
      beneficiaries: 42
    },
    {
      id: 4,
      name: "Sunita Yadav",
      village: "Krishnanagar",
      phone: "+91 98765 43213",
      rating: 4.9,
      status: "active",
      tasksCompleted: 28,
      tasksPending: 1,
      lastActive: "1 hour ago",
      beneficiaries: 52
    }
  ];

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
    }
    return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inactive</Badge>;
  };

  const getStatusIcon = (status: string) => {
    if (status === "active") {
      return <div className="h-3 w-3 bg-green-500 rounded-full"></div>;
    }
    return <div className="h-3 w-3 bg-gray-400 rounded-full"></div>;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">ASHA Workers</h2>
        <Badge variant="outline">{ashas.length} Total</Badge>
      </div>

      {ashas.map((asha) => (
        <Card key={asha.id} className="shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-indigo-100 text-indigo-600">
                    {asha.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900">{asha.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{asha.village}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(asha.status)}
                {getStatusBadge(asha.status)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Completed</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">{asha.tasksCompleted}</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-900">Pending</span>
                </div>
                <p className="text-2xl font-bold text-orange-600">{asha.tasksPending}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{asha.rating}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>{asha.beneficiaries} beneficiaries</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Last active: {asha.lastActive}</span>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="h-8">
                  <Phone className="h-3 w-3 mr-1" />
                  Call
                </Button>
                <Button size="sm" className="h-8">
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
