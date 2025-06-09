import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Users, MapPin, Phone, TrendingUp, TrendingDown, Edit, Trash2, Download, FileSpreadsheet, User, Target, Activity } from 'lucide-react';
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
      population: Math.floor(Math.random() * 500) + 500,
      performance: Math.floor(Math.random() * 40) + 60,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50/20">
      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Enhanced Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                <Activity className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-1">ASHA Performance Dashboard</h1>
                <p className="text-slate-600 text-base lg:text-lg">Accredited Social Health Activist Programme</p>
                <p className="text-sm text-green-700 font-medium bg-green-50 px-2 py-1 rounded-md inline-block mt-1">
                  Ministry of Health & Family Welfare, Government of India
                </p>
              </div>
            </div>
            
            {selectedAshas.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <Button 
                  onClick={handleViewCombinedPerformance}
                  className="bg-green-600 hover:bg-green-700 text-white shadow-sm border-0 font-medium"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Combined Analysis ({selectedAshas.length})
                </Button>
                <Button 
                  onClick={handleExportAll}
                  variant="outline"
                  className="border-green-200 text-green-700 hover:bg-green-50 shadow-sm font-medium"
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export Selected
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Professional Summary Stats */}
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

        {/* Enhanced Search and Controls */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="Search ASHAs by name or village..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11 border-slate-300 focus:border-green-500 focus:ring-green-500 text-slate-900 placeholder:text-slate-500"
              />
            </div>
            {filteredAshas.length > 0 && (
              <div className="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
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

        {/* Enhanced ASHA Cards Grid */}
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-xs border-slate-200 hover:bg-slate-50 text-slate-700 font-medium"
                    onClick={() => handleViewProfile(asha)}
                  >
                    <User className="h-3 w-3 mr-1" />
                    Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 text-xs border-slate-200 hover:bg-slate-50 text-slate-700 font-medium"
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

        {/* Enhanced Empty State */}
        {ashas.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-200">
            <div className="p-6 bg-green-50 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center border border-green-100">
              <Users className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Welcome to ASHA Management</h3>
            <p className="text-slate-600 mb-2">Start building your ASHA team for better community health coverage</p>
            <p className="text-sm text-slate-500 mb-8">Add ASHAs from your designated area to begin monitoring and supporting their work</p>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3 font-medium shadow-sm"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Your First ASHA
            </Button>
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      {ashas.length > 0 && (
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
          disabled={ashas.length >= 20}
          title="Add ASHA Worker"
        >
          <Plus className="h-8 w-8" />
        </button>
      )}

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
