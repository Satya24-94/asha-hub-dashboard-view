
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Users, MapPin, Phone, TrendingUp, TrendingDown, Edit, Trash2, Download, FileSpreadsheet, User, Target } from 'lucide-react';
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
      color: 'bg-white border-gray-200',
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
      color: 'bg-white border-gray-200',
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
      color: 'bg-white border-gray-200',
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
      color: 'bg-white border-gray-200',
      profileImage: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936e63?w=150&h=150&fit=crop&crop=face'
    }
  ]);

  // All available ASHAs that can be added (tagged under this facilitator)
  const availableAshas = [
    { id: '7', name: 'Anita Kumari', village: 'Bishunpur', phone: '+91 9876543216' },
    { id: '8', name: 'Rekha Devi', village: 'Janakpur', phone: '+91 9876543217' },
    { id: '9', name: 'Sita Kumari', village: 'Lalpur', phone: '+91 9876543218' },
    { id: '10', name: 'Geeta Sharma', village: 'Sonpur', phone: '+91 9876543219' },
    { id: '11', name: 'Poonam Devi', village: 'Bettiah', phone: '+91 9876543220' },
    { id: '12', name: 'Mamta Singh', village: 'Motihari', phone: '+91 9876543221' },
    { id: '13', name: 'Shanti Devi', village: 'Bagaha', phone: '+91 9876543222' },
    { id: '14', name: 'Urmila Kumari', village: 'Siwan', phone: '+91 9876543223' },
    { id: '15', name: 'Savita Rani', village: 'Chapra', phone: '+91 9876543224' },
    { id: '16', name: 'Pushpa Devi', village: 'Gopalganj', phone: '+91 9876543225' },
    { id: '17', name: 'Kiran Kumari', village: 'Muzaffarpur', phone: '+91 9876543226' },
    { id: '18', name: 'Asha Devi', village: 'Darbhanga', phone: '+91 9876543227' },
    { id: '19', name: 'Renu Singh', village: 'Begusarai', phone: '+91 9876543228' },
    { id: '20', name: 'Sunita Kumari', village: 'Samastipur', phone: '+91 9876543229' }
  ];

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
    activeAshas: 20
  };

  const filteredAshas = ashas.filter(asha => 
    asha.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asha.village.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAsha = (selectedAshaId: string) => {
    const ashaToAdd = availableAshas.find(asha => asha.id === selectedAshaId);
    
    if (!ashaToAdd) return;
    
    if (ashas.length >= 20) {
      alert('Maximum 20 ASHAs allowed per facilitator');
      return;
    }

    const newAsha: AshaData = {
      id: ashaToAdd.id,
      name: ashaToAdd.name,
      village: ashaToAdd.village,
      phone: ashaToAdd.phone,
      population: Math.floor(Math.random() * 500) + 500, // Random population between 500-1000
      performance: Math.floor(Math.random() * 40) + 60, // Random performance between 60-100
      trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable',
      status: 'active',
      color: 'bg-white border-gray-200'
    };

    setAshas(prev => [...prev, newAsha]);
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
    // Create CSV data
    const csvData = [
      ['Field', 'Value'],
      ['Name', asha.name],
      ['Village', asha.village],
      ['Phone', asha.phone],
      ['Population', asha.population.toString()],
      ['Performance', `${asha.performance}%`],
      ['Status', asha.status],
      ['Trend', asha.trend]
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${asha.name.replace(/\s+/g, '_')}_report.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleExportAll = () => {
    const selectedData = ashas.filter(asha => selectedAshas.includes(asha.id));
    const csvData = [
      ['Name', 'Village', 'Phone', 'Population', 'Performance', 'Status', 'Trend']
    ];
    
    selectedData.forEach(asha => {
      csvData.push([
        asha.name,
        asha.village,
        asha.phone,
        asha.population.toString(),
        `${asha.performance}%`,
        asha.status,
        asha.trend
      ]);
    });
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ASHA_Team_Report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Professional Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex-1 mr-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">ASHA Performance Dashboard</h1>
              <p className="text-gray-600">Comprehensive management and monitoring of ASHA workers</p>
            </div>
            <div className="flex gap-4">
              {selectedAshas.length > 0 && (
                <>
                  <Button 
                    onClick={handleViewCombinedPerformance}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Combined Performance ({selectedAshas.length})
                  </Button>
                  <Button 
                    onClick={handleExportAll}
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 shadow-md"
                  >
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Export Selected
                  </Button>
                </>
              )}
              <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-full h-14 w-14 p-0 shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={ashas.length >= 20}
                title="Add ASHA Worker"
              >
                <Plus className="h-7 w-7" />
              </Button>
            </div>
          </div>

          {/* Professional Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white shadow-sm border-0 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Total ASHAs</p>
                    <p className="text-3xl font-bold text-gray-900">{ashas.length}/{targets.totalAshas}</p>
                    <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(ashas.length / targets.totalAshas) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm border-0 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Total Population</p>
                    <p className="text-3xl font-bold text-gray-900">{totalPopulation.toLocaleString()}/{targets.totalPopulation.toLocaleString()}</p>
                    <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((totalPopulation / targets.totalPopulation) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-xl">
                    <MapPin className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm border-0 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Avg Performance</p>
                    <p className="text-3xl font-bold text-gray-900">{averagePerformance}%</p>
                    <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${averagePerformance}%` }}
                      />
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-xl">
                    <Target className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm border-0 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Active ASHAs</p>
                    <p className="text-3xl font-bold text-gray-900">{ashas.filter(a => a.status === 'active').length}/{targets.activeAshas}</p>
                    <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(ashas.filter(a => a.status === 'active').length / targets.activeAshas) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl">
                    <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <div className="h-4 w-4 bg-emerald-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Select All */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Search ASHAs by name or village..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            {filteredAshas.length > 0 && (
              <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-lg border border-gray-200">
                <Checkbox
                  id="select-all"
                  checked={selectedAshas.length === filteredAshas.length}
                  onCheckedChange={handleSelectAll}
                />
                <label htmlFor="select-all" className="text-sm font-medium text-gray-700">
                  Select All ({filteredAshas.length})
                </label>
              </div>
            )}
          </div>
        </div>

        {/* ASHA Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAshas.map((asha) => (
            <Card key={asha.id} className="bg-white hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedAshas.includes(asha.id)}
                      onCheckedChange={(checked) => handleSelectAsha(asha.id, checked as boolean)}
                    />
                    <Badge variant={asha.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                      {asha.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                      <Edit className="h-4 w-4 text-gray-500" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleRemoveAsha(asha.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border-2 border-gray-100">
                    <AvatarImage src={asha.profileImage} alt={asha.name} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">
                      {asha.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg font-semibold text-gray-900">{asha.name}</CardTitle>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {asha.village}
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    {asha.phone}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    {asha.population.toLocaleString()} people
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Performance</span>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(asha.trend)}
                      <span className="text-lg font-bold text-gray-900">{asha.performance}%</span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${asha.performance}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-xs border-gray-200 hover:bg-gray-50"
                    onClick={() => handleViewProfile(asha)}
                  >
                    <User className="h-3 w-3 mr-1" />
                    Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-xs border-gray-200 hover:bg-gray-50"
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
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-4 bg-gray-50 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Users className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No ASHAs Added</h3>
            <p className="text-gray-600 mb-6">Start building your team by adding your first ASHA worker</p>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-full px-8 py-3"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add First ASHA
            </Button>
          </div>
        )}
      </div>

      <AddAshaModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddAsha}
        availableAshas={availableAshas.filter(asha => !ashas.some(existing => existing.id === asha.id))}
      />

      <AshaProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        asha={selectedAsha}
        onExport={selectedAsha ? () => handleExportSingle(selectedAsha) : undefined}
      />

      <CombinedPerformanceModal
        isOpen={isCombinedPerformanceOpen}
        onClose={() => setIsCombinedPerformanceOpen(false)}
        selectedAshas={ashas.filter(asha => selectedAshas.includes(asha.id))}
      />
    </div>
  );
};
