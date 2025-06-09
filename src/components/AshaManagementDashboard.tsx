
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Users, MapPin, Phone, TrendingUp, TrendingDown, Edit, Trash2, Download, FileSpreadsheet, User, Target, Activity } from 'lucide-react';

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

export const AshaManagementDashboard = () => {
  const [ashas, setAshas] = useState<AshaData[]>([
    {
      id: '1',
      name: 'Priya Sharma',
      village: 'Rampur',
      phone: '+91 9876543210',
      population: 850,
      performance: 92,
      trend: 'up',
      status: 'active',
      color: 'bg-white border-gray-200',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b784?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Meera Devi',
      village: 'Govindpur',
      phone: '+91 9876543211',
      population: 720,
      performance: 78,
      trend: 'down',
      status: 'active',
      color: 'bg-white border-gray-200',
      profileImage: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936e63?w=150&h=150&fit=crop&crop=face'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAshas, setSelectedAshas] = useState<string[]>([]);

  const targets = {
    totalAshas: 20,
    totalPopulation: 20000,
    activeAshas: 20
  };

  const filteredAshas = ashas.filter(asha => 
    asha.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asha.village.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAsha = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedAshas(prev => [...prev, id]);
    } else {
      setSelectedAshas(prev => prev.filter(ashaId => ashaId !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAshas(filteredAshas.map(asha => asha.id));
    } else {
      setSelectedAshas([]);
    }
  };

  const handleRemoveAsha = (id: string) => {
    setAshas(prev => prev.filter(asha => asha.id !== id));
    setSelectedAshas(prev => prev.filter(ashaId => ashaId !== id));
  };

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

  const totalPopulation = ashas.reduce((sum, asha) => sum + asha.population, 0);
  const averagePerformance = ashas.length > 0 ? Math.round(ashas.reduce((sum, asha) => sum + asha.performance, 0) / ashas.length) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50/20">
      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                <Activity className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-1">ASHA Performance Dashboard</h1>
                <p className="text-slate-600 text-base lg:text-lg">Accredited Social Health Activist Programme</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card className="bg-white rounded-xl shadow-sm border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <Badge variant="outline" className="text-xs font-medium">
                  {Math.round((ashas.length / targets.totalAshas) * 100)}%
                </Badge>
              </div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Total ASHAs</h3>
              <p className="text-3xl font-bold text-slate-900">{ashas.length}</p>
              <p className="text-xs text-slate-600 mt-2">Target: {targets.totalAshas}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white rounded-xl shadow-sm border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <Badge variant="outline" className="text-xs font-medium">
                  {Math.round((totalPopulation / targets.totalPopulation) * 100)}%
                </Badge>
              </div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Population Coverage</h3>
              <p className="text-3xl font-bold text-slate-900">{totalPopulation.toLocaleString()}</p>
              <p className="text-xs text-slate-600 mt-2">Target: {targets.totalPopulation.toLocaleString()}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white rounded-xl shadow-sm border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <Badge variant={averagePerformance >= 80 ? "default" : "secondary"} className="text-xs font-medium">
                  {averagePerformance >= 80 ? 'Good' : 'Needs Improvement'}
                </Badge>
              </div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Average Performance</h3>
              <p className="text-3xl font-bold text-slate-900">{averagePerformance}%</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white rounded-xl shadow-sm border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <Activity className="h-6 w-6 text-emerald-600" />
                </div>
                <Badge variant="outline" className="text-xs font-medium">
                  100%
                </Badge>
              </div>
              <h3 className="text-sm font-semibold text-slate-700 mb-2">Active ASHAs</h3>
              <p className="text-3xl font-bold text-slate-900">{ashas.filter(a => a.status === 'active').length}</p>
              <p className="text-xs text-slate-600 mt-2">Target: {targets.activeAshas}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search Controls */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Search ASHAs by name or village..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11 border-slate-300 focus:border-green-500"
              />
            </div>
            {filteredAshas.length > 0 && (
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="select-all"
                  checked={selectedAshas.length === filteredAshas.length}
                  onCheckedChange={handleSelectAll}
                />
                <label htmlFor="select-all" className="text-sm font-medium text-slate-700">
                  Select All ({filteredAshas.length})
                </label>
              </div>
            )}
          </div>
        </div>

        {/* ASHA Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {filteredAshas.map((asha) => (
            <Card key={asha.id} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedAshas.includes(asha.id)}
                      onCheckedChange={(checked) => handleSelectAsha(asha.id, checked as boolean)}
                    />
                    <Badge variant={asha.status === 'active' ? 'default' : 'secondary'} className="text-xs font-medium">
                      {asha.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      onClick={() => handleRemoveAsha(asha.id)}
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
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    <User className="h-3 w-3 mr-1" />
                    Profile
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs">
                    <Download className="h-3 w-3 mr-1" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {ashas.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-200">
            <div className="p-6 bg-green-50 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Users className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Welcome to ASHA Management</h3>
            <p className="text-slate-600 mb-8">Start building your ASHA team for better community health coverage</p>
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3">
              <Plus className="h-5 w-5 mr-2" />
              Add Your First ASHA
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
