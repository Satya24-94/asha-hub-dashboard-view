import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Users, MapPin, Phone, TrendingUp, TrendingDown, Edit, Trash2, Download, FileSpreadsheet, User, Crown, AlertTriangle, Target } from 'lucide-react';
import { AddAshaModal } from '@/components/AddAshaModal';
import { AshaProfileModal } from '@/components/AshaProfileModal';
import { CombinedPerformanceModal } from '@/components/CombinedPerformanceModal';

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
      color: 'bg-pink-100 border-pink-300',
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
      color: 'bg-blue-100 border-blue-300',
      profileImage: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936e63?w=150&h=150&fit=crop&crop=face'
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
      color: 'bg-green-100 border-green-300',
      profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d674c8e?w=150&h=150&fit=crop&crop=face'
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
      color: 'bg-purple-100 border-purple-300',
      profileImage: 'https://images.unsplash.com/photo-1570295999680-5e19b29a2ca5?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '5',
      name: 'Radha Singh',
      village: 'Shivpur',
      phone: '+91 9876543214',
      population: 800,
      performance: 88,
      trend: 'up',
      status: 'active',
      color: 'bg-yellow-100 border-yellow-300',
      profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d674c8e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '6',
      name: 'Kavita Rani',
      village: 'Madhubani',
      phone: '+91 9876543215',
      population: 750,
      performance: 65,
      trend: 'down',
      status: 'active',
      color: 'bg-indigo-100 border-indigo-300',
      profileImage: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936e63?w=150&h=150&fit=crop&crop=face'
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCombinedPerformanceOpen, setIsCombinedPerformanceOpen] = useState(false);
  const [selectedAsha, setSelectedAsha] = useState<AshaData | null>(null);
  const [selectedAshas, setSelectedAshas] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Targets for denominator display
  const targets = {
    totalAshas: 20,
    totalPopulation: 20000,
    averagePerformance: 85,
    activeAshas: 20
  };

  const filteredAshas = ashas.filter(asha => 
    asha.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asha.village.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get top and bottom performers
  const topPerformers = [...ashas].sort((a, b) => b.performance - a.performance).slice(0, 5);
  const bottomPerformers = [...ashas].sort((a, b) => a.performance - b.performance).slice(0, 5);

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
    setSelectedAshas(prev => prev.filter(ashaId => ashaId !== id));
  };

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

  const handleViewProfile = (asha: AshaData) => {
    setSelectedAsha(asha);
    setIsProfileModalOpen(true);
  };

  const handleViewCombinedPerformance = () => {
    setIsCombinedPerformanceOpen(true);
  };

  const handleExportSingle = (asha: AshaData) => {
    const data = {
      name: asha.name,
      village: asha.village,
      performance: asha.performance,
      population: asha.population,
      status: asha.status
    };
    console.log('Exporting single ASHA data:', data);
    alert(`Exporting ${asha.name}'s data to Excel...`);
  };

  const handleExportAll = () => {
    const selectedData = ashas.filter(asha => selectedAshas.includes(asha.id));
    console.log('Exporting selected ASHAs data:', selectedData);
    alert(`Exporting ${selectedData.length} ASHA(s) data to Excel...`);
  };

  const handleSelectTopPerformers = () => {
    setSelectedAshas(topPerformers.map(asha => asha.id));
  };

  const handleSelectBottomPerformers = () => {
    setSelectedAshas(bottomPerformers.map(asha => asha.id));
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
            <div className="flex gap-3">
              {selectedAshas.length > 0 && (
                <>
                  <Button 
                    onClick={handleViewCombinedPerformance}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Combined Performance ({selectedAshas.length})
                  </Button>
                  <Button 
                    onClick={handleExportAll}
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Export Selected
                  </Button>
                </>
              )}
              <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full h-12 w-12 p-0"
                disabled={ashas.length >= 20}
              >
                <Plus className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Summary Stats with Targets */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total ASHAs</p>
                    <p className="text-2xl font-bold text-gray-900">{ashas.length}/{targets.totalAshas}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(ashas.length / targets.totalAshas) * 100}%` }}
                      ></div>
                    </div>
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
                    <p className="text-2xl font-bold text-gray-900">{totalPopulation.toLocaleString()}/{targets.totalPopulation.toLocaleString()}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${Math.min((totalPopulation / targets.totalPopulation) * 100, 100)}%` }}
                      ></div>
                    </div>
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
                    <p className="text-2xl font-bold text-gray-900">{averagePerformance}%/{targets.averagePerformance}%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${(averagePerformance / targets.averagePerformance) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active ASHAs</p>
                    <p className="text-2xl font-bold text-gray-900">{ashas.filter(a => a.status === 'active').length}/{targets.activeAshas}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full"
                        style={{ width: `${(ashas.filter(a => a.status === 'active').length / targets.activeAshas) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Action Buttons */}
          <div className="flex gap-3 mb-6">
            <Button 
              onClick={handleSelectTopPerformers}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Crown className="h-4 w-4 mr-2" />
              Top 5 Performers
            </Button>
            <Button 
              onClick={handleSelectBottomPerformers}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Bottom 5 Performers
            </Button>
          </div>

          {/* Search and Select All */}
          <div className="mb-6 flex items-center gap-4">
            <Input
              placeholder="Search ASHAs by name or village..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
            {filteredAshas.length > 0 && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="select-all"
                  checked={selectedAshas.length === filteredAshas.length}
                  onCheckedChange={handleSelectAll}
                />
                <label htmlFor="select-all" className="text-sm font-medium">
                  Select All ({filteredAshas.length})
                </label>
              </div>
            )}
          </div>
        </div>

        {/* ASHA Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAshas.map((asha) => (
            <Card key={asha.id} className={`relative ${asha.color} hover:shadow-lg transition-all duration-200 border-2`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedAshas.includes(asha.id)}
                      onCheckedChange={(checked) => handleSelectAsha(asha.id, checked as boolean)}
                    />
                    <Badge variant={asha.status === 'active' ? 'default' : 'secondary'}>
                      {asha.status}
                    </Badge>
                  </div>
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
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={asha.profileImage} alt={asha.name} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">
                      {asha.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{asha.name}</CardTitle>
                </div>
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
                  Population: {asha.population.toLocaleString()}/1000
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
                
                <div className="flex gap-2 mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 hover:bg-white/50"
                    onClick={() => handleViewProfile(asha)}
                  >
                    <User className="h-3 w-3 mr-1" />
                    Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 hover:bg-white/50"
                    onClick={() => handleExportSingle(asha)}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {ashas.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No ASHAs Added</h3>
            <p className="text-gray-600 mb-4">Start by adding your first ASHA worker</p>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="rounded-full"
            >
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

      <AshaProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        asha={selectedAsha}
      />

      <CombinedPerformanceModal
        isOpen={isCombinedPerformanceOpen}
        onClose={() => setIsCombinedPerformanceOpen(false)}
        selectedAshas={ashas.filter(asha => selectedAshas.includes(asha.id))}
      />
    </div>
  );
};
