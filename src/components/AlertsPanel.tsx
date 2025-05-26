
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Clock, 
  Users, 
  MapPin,
  Phone,
  Calendar,
  ExternalLink
} from "lucide-react";

export const AlertsPanel = () => {
  const alerts = [
    {
      id: 1,
      type: "overdue",
      title: "Overdue Task",
      message: "Monthly health checkup for Block A is 2 days overdue",
      asha: "Lakshmi K",
      location: "Sundarganj",
      timestamp: "2 hours ago",
      severity: "high",
      actionRequired: true
    },
    {
      id: 2,
      type: "missed",
      title: "Missed Visit",
      message: "Scheduled beneficiary visit was missed",
      asha: "Priya Sharma",
      location: "Rampur",
      timestamp: "4 hours ago",
      severity: "medium",
      actionRequired: true
    },
    {
      id: 3,
      type: "low-performance",
      title: "Performance Alert",
      message: "Task completion rate below 70% this week",
      asha: "Meera Devi",
      location: "Govindpur",
      timestamp: "6 hours ago",
      severity: "medium",
      actionRequired: false
    },
    {
      id: 4,
      type: "equipment",
      title: "Equipment Issue",
      message: "Blood pressure monitor needs calibration",
      asha: "Sunita Yadav",
      location: "Krishnanagar",
      timestamp: "8 hours ago",
      severity: "low",
      actionRequired: true
    },
    {
      id: 5,
      type: "training",
      title: "Training Due",
      message: "Annual skill refresh training is due next week",
      asha: "All ASHAs",
      location: "District Office",
      timestamp: "1 day ago",
      severity: "low",
      actionRequired: false
    }
  ];

  const getSeverityBadge = (severity: string) => {
    const variants = {
      high: "bg-red-100 text-red-800 border-red-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      low: "bg-blue-100 text-blue-800 border-blue-200"
    };
    return <Badge className={variants[severity as keyof typeof variants]}>{severity}</Badge>;
  };

  const getAlertIcon = (type: string, severity: string) => {
    const iconClass = severity === "high" ? "text-red-500" : 
                     severity === "medium" ? "text-yellow-500" : "text-blue-500";
    
    switch (type) {
      case "overdue":
        return <Clock className={`h-5 w-5 ${iconClass}`} />;
      case "missed":
        return <AlertTriangle className={`h-5 w-5 ${iconClass}`} />;
      case "low-performance":
        return <Users className={`h-5 w-5 ${iconClass}`} />;
      default:
        return <AlertTriangle className={`h-5 w-5 ${iconClass}`} />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Alert Summary */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-red-900">Active Alerts</h3>
              <p className="text-sm text-red-700">
                {alerts.filter(a => a.actionRequired).length} require immediate attention
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-red-600">{alerts.length}</p>
              <p className="text-xs text-red-600">Total alerts</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert List */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <Card key={alert.id} className={`shadow-md ${
            alert.severity === "high" ? "border-l-4 border-l-red-500" :
            alert.severity === "medium" ? "border-l-4 border-l-yellow-500" :
            "border-l-4 border-l-blue-500"
          }`}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  {getAlertIcon(alert.type, alert.severity)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                    </div>
                    {getSeverityBadge(alert.severity)}
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{alert.asha}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>

                  {alert.actionRequired && (
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="h-8">
                        <Phone className="h-3 w-3 mr-1" />
                        Call ASHA
                      </Button>
                      <Button size="sm" className="h-8">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start" variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Team Meeting
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Send Broadcast Message
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Generate Alert Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
