
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
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
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200 transition-all duration-300 hover:scale-105">
            <CheckCircle className="h-3 w-3 mr-1" />Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200 hover:bg-red-200 transition-all duration-300 hover:scale-105">
            <AlertCircle className="h-3 w-3 mr-1" />Inactive
          </Badge>
        );
      case "warning":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200 transition-all duration-300 hover:scale-105">
            <Clock className="h-3 w-3 mr-1" />Warning
          </Badge>
        );
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  // Format numbers to one decimal place
  const formattedRating = asha.rating.toFixed(1);
  const completionPercentage = Math.round((asha.tasksCompleted / asha.tasksTotal) * 100);

  return (
    <TooltipProvider>
      <Card 
        className="shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer bg-gradient-to-br from-white to-emerald-50 border-emerald-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className={`h-14 w-14 transition-all duration-300 ${isHovered ? 'scale-110 ring-4 ring-emerald-200' : ''}`}>
                  <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold text-lg">
                    {asha.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{asha.name}</p>
              </TooltipContent>
            </Tooltip>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg text-emerald-900 hover:text-emerald-700 transition-colors">
                  {asha.name}
                </h3>
                {getStatusBadge(asha.status)}
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-emerald-700 mb-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-1 hover:text-emerald-800 transition-colors cursor-pointer">
                      <MapPin className="h-4 w-4" />
                      <span className="font-medium">{asha.village}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Village: {asha.village}</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-1 hover:text-emerald-800 transition-colors cursor-pointer">
                      <Phone className="h-4 w-4" />
                      <span className="font-medium">{asha.phone}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Phone: {asha.phone}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center space-x-1 cursor-pointer hover:scale-110 transition-transform">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-bold text-emerald-900">{formattedRating}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Rating: {formattedRating} out of 5.0</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center space-x-1 cursor-pointer hover:scale-110 transition-transform">
                          <Activity className="h-4 w-4 text-emerald-600" />
                          <span className="text-sm font-medium text-emerald-800">{asha.tasksCompleted}/{asha.tasksTotal} tasks</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Tasks completed: {asha.tasksCompleted} out of {asha.tasksTotal}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  
                  <Badge 
                    variant={completionPercentage >= 80 ? "default" : completionPercentage >= 60 ? "secondary" : "destructive"}
                    className="animate-pulse hover:animate-none transition-all duration-300 hover:scale-110"
                  >
                    {completionPercentage}%
                  </Badge>
                </div>
                
                <Progress 
                  value={completionPercentage} 
                  className={`h-2 transition-all duration-500 ${isHovered ? 'h-3' : ''} bg-emerald-100`}
                />
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                    Last active: {asha.lastActive}
                  </div>
                  <div className="flex space-x-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            onPreview(asha);
                          }}
                          className="text-xs hover:bg-emerald-100 hover:text-emerald-700 transition-all duration-300 hover:scale-110"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Quick preview of {asha.name}'s data</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDashboard(asha.id);
                          }}
                          className="text-xs hover:bg-emerald-100 hover:text-emerald-700 hover:border-emerald-300 transition-all duration-300 hover:scale-110"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Dashboard
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Open {asha.name}'s full dashboard</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
