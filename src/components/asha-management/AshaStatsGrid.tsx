
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MapPin, Target, Activity } from 'lucide-react';

interface AshaStatsGridProps {
  ashas: any[];
  targets: {
    totalAshas: number;
    totalPopulation: number;
    activeAshas: number;
  };
}

export const AshaStatsGrid = ({ ashas, targets }: AshaStatsGridProps) => {
  const totalPopulation = ashas.reduce((sum, asha) => sum + asha.population, 0);
  const averagePerformance = ashas.length > 0 ? Math.round(ashas.reduce((sum, asha) => sum + asha.performance, 0) / ashas.length) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      <Card className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <Badge variant="outline" className="text-xs font-medium bg-blue-50 text-blue-700 border-blue-200">
              {Math.round((ashas.length / targets.totalAshas) * 100)}%
            </Badge>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-700">Total ASHAs</h3>
            <p className="text-3xl font-bold text-slate-900">{ashas.length}</p>
            <p className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">Target: {targets.totalAshas}</p>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((ashas.length / targets.totalAshas) * 100, 100)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-xl border border-green-100">
              <MapPin className="h-6 w-6 text-green-600" />
            </div>
            <Badge variant="outline" className="text-xs font-medium bg-green-50 text-green-700 border-green-200">
              {Math.round((totalPopulation / targets.totalPopulation) * 100)}%
            </Badge>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-700">Population Coverage</h3>
            <p className="text-3xl font-bold text-slate-900">{totalPopulation.toLocaleString()}</p>
            <p className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">Target: {targets.totalPopulation.toLocaleString()}</p>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((totalPopulation / targets.totalPopulation) * 100, 100)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <Badge 
              variant={averagePerformance >= 80 ? "default" : "secondary"}
              className={`text-xs font-medium ${
                averagePerformance >= 80 
                  ? 'bg-green-50 text-green-700 border-green-200' 
                  : 'bg-orange-50 text-orange-700 border-orange-200'
              }`}
            >
              {averagePerformance >= 80 ? 'Good' : 'Needs Improvement'}
            </Badge>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-700">Average Performance</h3>
            <p className="text-3xl font-bold text-slate-900">{averagePerformance}%</p>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  averagePerformance >= 80 ? 'bg-green-500' : 'bg-orange-500'
                }`}
                style={{ width: `${averagePerformance}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <Activity className="h-6 w-6 text-emerald-600" />
            </div>
            <Badge variant="outline" className="text-xs font-medium bg-emerald-50 text-emerald-700 border-emerald-200">
              {Math.round((ashas.filter(a => a.status === 'active').length / targets.activeAshas) * 100)}%
            </Badge>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-700">Active ASHAs</h3>
            <p className="text-3xl font-bold text-slate-900">{ashas.filter(a => a.status === 'active').length}</p>
            <p className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">Target: {targets.activeAshas}</p>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((ashas.filter(a => a.status === 'active').length / targets.activeAshas) * 100, 100)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
