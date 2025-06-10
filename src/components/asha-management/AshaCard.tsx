
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, Phone, Users, Edit, Trash2, Download, User, TrendingUp, TrendingDown } from 'lucide-react';

interface AshaData {
  id: string;
  name: string;
  village: string;
  phone: string;
  population: number;
  performance: number;
  trend: 'up' | 'down' | 'stable';
  status: 'active' | 'inactive';
  color: string;
  profileImage?: string;
}

interface AshaCardProps {
  asha: AshaData;
  isSelected: boolean;
  onSelect: (id: string, checked: boolean) => void;
  onViewProfile: (asha: AshaData) => void;
  onRemove: (id: string) => void;
  onExport: (asha: AshaData) => void;
}

export const AshaCard = ({ 
  asha, 
  isSelected, 
  onSelect, 
  onViewProfile, 
  onRemove, 
  onExport 
}: AshaCardProps) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <div className="h-4 w-4" />;
    }
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => onSelect(asha.id, checked as boolean)}
            />
            <Badge 
              variant={asha.status === 'active' ? 'default' : 'secondary'} 
              className={`text-xs font-medium ${
                asha.status === 'active' 
                  ? 'bg-green-50 text-green-700 border-green-200' 
                  : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              {asha.status}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-100 text-slate-600">
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => onRemove(asha.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-slate-100">
            <AvatarImage src={asha.profileImage} alt={asha.name} />
            <AvatarFallback className="bg-green-50 text-green-700 font-bold text-sm">
              {asha.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-lg font-semibold text-slate-900">{asha.name}</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3 text-sm">
          <div className="flex items-center text-slate-700">
            <MapPin className="h-4 w-4 mr-2 text-slate-500" />
            <span className="font-medium">{asha.village}</span>
          </div>
          <div className="flex items-center text-slate-700">
            <Phone className="h-4 w-4 mr-2 text-slate-500" />
            <span>{asha.phone}</span>
          </div>
          <div className="flex items-center text-slate-700">
            <Users className="h-4 w-4 mr-2 text-slate-500" />
            <span>{asha.population.toLocaleString()} people</span>
          </div>
        </div>
        
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-700">Performance</span>
            <div className="flex items-center gap-2">
              {getTrendIcon(asha.trend)}
              <span className="text-lg font-bold text-slate-900">{asha.performance}%</span>
            </div>
          </div>
          
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${asha.performance}%` }}
            />
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-xs border-slate-200 hover:bg-slate-50 text-slate-700 font-medium"
            onClick={() => onViewProfile(asha)}
          >
            <User className="h-3 w-3 mr-1" />
            Profile
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-xs border-slate-200 hover:bg-slate-50 text-slate-700 font-medium"
            onClick={() => onExport(asha)}
          >
            <Download className="h-3 w-3 mr-1" />
            Export
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
