
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Phone, 
  Star, 
  Activity,
  Eye,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface AshaData {
  id: number;
  name: string;
  village: string;
  phone: string;
  rating: number;
  tasksCompleted: number;
  tasksTotal: number;
  status: 'active' | 'inactive' | 'warning';
  lastActive: string;
}

interface AshaCardProps {
  asha: AshaData;
  onViewDashboard: (id: number) => void;
  onPreview: (asha: AshaData) => void;
}

export const AshaCard = ({ asha, onViewDashboard, onPreview }: AshaCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

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

  const completionPercentage = Math.round((asha.tasksCompleted / asha.tasksTotal) * 100);

  return (
    <Card 
      className="shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Avatar className={`h-12 w-12 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>
            <AvatarFallback className="bg-indigo-100 text-indigo-600 font-semibold">
              {asha.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                {asha.name}
              </h3>
              {getStatusBadge(asha.status)}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{asha.village}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3" />
                <span>{asha.phone}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{asha.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Activity className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{asha.tasksCompleted}/{asha.tasksTotal} tasks</span>
                  </div>
                </div>
                <Badge 
                  variant={completionPercentage >= 80 ? "default" : completionPercentage >= 60 ? "secondary" : "destructive"}
                  className="animate-pulse"
                >
                  {completionPercentage}%
                </Badge>
              </div>
              
              <Progress 
                value={completionPercentage} 
                className={`h-2 transition-all duration-500 ${isHovered ? 'h-3' : ''}`}
              />
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  Last active: {asha.lastActive}
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPreview(asha);
                    }}
                    className="text-xs hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDashboard(asha.id);
                    }}
                    className="text-xs hover:bg-green-50 hover:text-green-600 hover:border-green-300"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Dashboard
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
