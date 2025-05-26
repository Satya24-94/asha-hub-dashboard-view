
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  MapPin, 
  Phone, 
  Star, 
  Activity,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Target,
  Calendar
} from "lucide-react";

interface AshaPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  asha: {
    id: number;
    name: string;
    village: string;
    phone: string;
    rating: number;
    tasksCompleted: number;
    tasksTotal: number;
    status: string;
    lastActive: string;
  } | null;
}

export const AshaPreviewModal = ({ isOpen, onClose, asha }: AshaPreviewModalProps) => {
  if (!asha) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case "inactive":
        return <Badge className="bg-red-100 text-red-800 border-red-200"><AlertCircle className="h-3 w-3 mr-1" />Inactive</Badge>;
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><Clock className="h-3 w-3 mr-1" />Warning</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const completionRate = Math.round((asha.tasksCompleted / asha.tasksTotal) * 100);
  const estimatedIncentives = asha.tasksCompleted * 150; // Rough calculation

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-indigo-100 text-indigo-600 text-sm">
                {asha.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            ASHA Preview
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Profile Section */}
          <Card>
            <CardContent className="p-4">
              <div className="text-center mb-4">
                <Avatar className="h-16 w-16 mx-auto mb-2">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-indigo-100 text-indigo-600 text-lg">
                    {asha.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{asha.name}</h3>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{asha.village}</span>
                </div>
              </div>
              
              <div className="flex justify-center mb-4">
                {getStatusBadge(asha.status)}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{asha.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rating:</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{asha.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last Active:</span>
                  <span className="font-medium">{asha.lastActive}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Stats */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-6 w-6 opacity-80" />
                  <div>
                    <p className="text-green-100 text-xs">Completed</p>
                    <p className="text-lg font-bold">{asha.tasksCompleted}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-3">
                <div className="flex items-center space-x-2">
                  <Target className="h-6 w-6 opacity-80" />
                  <div>
                    <p className="text-blue-100 text-xs">Target</p>
                    <p className="text-lg font-bold">{asha.tasksTotal}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Overview */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Monthly Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Task Completion</span>
                  <span className="font-medium">{completionRate}%</span>
                </div>
                <Progress value={completionRate} className="h-2" />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Est. Incentives:</span>
                <span className="font-semibold text-green-600">₹{estimatedIncentives.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center space-x-2 p-3 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors">
              <Activity className="h-4 w-4" />
              <span>View Tasks</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-3 bg-green-50 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
              <DollarSign className="h-4 w-4" />
              <span>Incentives</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
