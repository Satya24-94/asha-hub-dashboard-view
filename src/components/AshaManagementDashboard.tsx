
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, MapPin, Phone, TrendingUp, TrendingDown, Edit, Trash2 } from 'lucide-react';
import { AddAshaModal } from '@/components/AddAshaModal';

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
      color: 'bg-pink-100 border-pink-300'
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
      color: 'bg-blue-100 border-blue-300'
    },
    {
      id: '3',
      name: 'Lakshmi K',
      village: 'Sundarganj',
      phone: '+91 9876543212',
      population: 950,
      performance: 85,
      trend: 'up',
      status: 'active',
      color: 'bg-green-100 border-green-300'
    },
    {
      id: '4',
      name: 'Sunita Yadav',
      village: 'Krishnanagar',
      phone: '+91 9876543213',
      population: 680,
      performance: 96,
      trend: 'up',
      status: 'active',
      color: 'bg-purple-100 border-purple-300'
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAshas = ashas.filter(asha => 
    asha.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asha.village.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAsha = (newAsha: Omit<AshaData, 'id'>) => {
    if (ashas.length >= 20) {
      alert('Maximum 20 ASHAs allowed per facilitator');
      return;
    }
    
    if (newAsha.population > 1000) {
      alert('ASHA cannot serve more than 1000 population');
      return;
    }

    const colors = [
      'bg-pink-100 border-pink-300',
      'bg-blue-100 border-blue-300',
      'bg-green-100 border-green-300',
      'bg-purple-100 border-purple-300',
      'bg-yellow-100 border-yellow-300',
      'bg-indigo-100 border-indigo-300'
    ];

    setAshas(prev => [...prev, {
      ...newAsha,
      id: Date.now().toString(),
      color: colors[Math.floor(Math.random() * colors.length)]
    }]);
    setIsAddModalOpen(false);
  };

  const handleRemoveAsha = (id: string) => {
    setAshas(prev => prev.filter(asha => asha.id !== id));
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ASHA Performance Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage and monitor individual ASHA workers</p>
            </div>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={ashas.length >= 20}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add ASHA {ashas.length >= 20 && '(Max Reached)'}
            </Button>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total ASHAs</p>
                    <p className="text-2xl font-bold text-gray-900">{ashas.length}/20</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Population</p>
                    <p className="text-2xl font-bold text-gray-900">{totalPopulation.toLocaleString()}</p>
                  </div>
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Performance</p>
                    <p className="text-2xl font-bold text-gray-900">{averagePerformance}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active ASHAs</p>
                    <p className="text-2xl font-bold text-gray-900">{ashas.filter(a => a.status === 'active').length}</p>
                  </div>
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <div className="mb-6">
            <Input
              placeholder="Search ASHAs by name or village..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
        </div>

        {/* ASHA Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAshas.map((asha) => (
            <Card key={asha.id} className={`relative ${asha.color} hover:shadow-lg transition-all duration-200 border-2`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant={asha.status === 'active' ? 'default' : 'secondary'}>
                    {asha.status}
                  </Badge>
                  <div className="flex items-center gap-2">
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
                <CardTitle className="text-lg">{asha.name}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {asha.village}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-1" />
                  {asha.phone}
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  Population: {asha.population.toLocaleString()}
                </div>
                
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Performance</span>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(asha.trend)}
                      <span className="text-lg font-bold">{asha.performance}%</span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${asha.performance}%` }}
                    ></div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-3 hover:bg-white/50"
                  onClick={() => window.open('/asha-dashboard', '_blank')}
                >
                  View Dashboard
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {ashas.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No ASHAs Added</h3>
            <p className="text-gray-600 mb-4">Start by adding your first ASHA worker</p>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First ASHA
            </Button>
          </div>
        )}
      </div>

      <AddAshaModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddAsha}
      />
    </div>
  );
};
