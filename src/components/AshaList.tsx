
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, MapPin, Phone, TrendingUp, TrendingDown, Eye, Download, Filter, Search } from 'lucide-react';

const AshaList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [performanceFilter, setPerformanceFilter] = useState('all');

  // Sample ASHA data
  const ashas = [
    {
      id: '1',
      name: 'Priya Sharma',
      village: 'Rampur',
      phone: '+91 9876543210',
      population: 850,
      performance: 92,
      trend: 'up' as const,
      status: 'active' as const,
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b784?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Meera Devi',
      village: 'Govindpur',
      phone: '+91 9876543211',
      population: 720,
      performance: 78,
      trend: 'down' as const,
      status: 'active' as const,
      profileImage: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936e63?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Lakshmi K',
      village: 'Sundarganj',
      phone: '+91 9876543212',
      population: 950,
      performance: 85,
      trend: 'up' as const,
      status: 'active' as const,
      profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d674c8e?w=150&h=150&fit=crop&crop=face'
    },
  ];

  const filteredAshas = ashas.filter(asha => {
    const matchesSearch = asha.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asha.village.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || asha.status === statusFilter;
    const matchesPerformance = performanceFilter === 'all' || 
                              (performanceFilter === 'high' && asha.performance >= 80) ||
                              (performanceFilter === 'medium' && asha.performance >= 60 && asha.performance < 80) ||
                              (performanceFilter === 'low' && asha.performance < 60);
    
    return matchesSearch && matchesStatus && matchesPerformance;
  });

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

  const getPerformanceBadge = (performance: number) => {
    if (performance >= 90) return <Badge className="bg-green-50 text-green-800 border-green-200 font-medium">Excellent</Badge>;
    if (performance >= 80) return <Badge className="bg-blue-50 text-blue-800 border-blue-200 font-medium">Good</Badge>;
    if (performance >= 70) return <Badge className="bg-orange-50 text-orange-800 border-orange-200 font-medium">Average</Badge>;
    return <Badge className="bg-red-50 text-red-800 border-red-200 font-medium">Needs Improvement</Badge>;
  };

  return (
    <div className="space-y-6 p-4 lg:p-6 bg-gradient-to-br from-slate-50 to-green-50/20 min-h-screen">
      {/* Enhanced Header */}
      <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">ASHA Workers Directory</h2>
            <p className="text-slate-600 text-base lg:text-lg">Comprehensive list of all ASHA workers in your area</p>
          </div>
          <div className="bg-green-50 px-4 py-3 rounded-xl border border-green-200">
            <span className="text-green-700 font-semibold text-lg">{filteredAshas.length} ASHAs</span>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name or village..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 border-slate-300 focus:border-green-500 focus:ring-green-500 text-slate-900 placeholder:text-slate-500"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-11 border-slate-300 focus:border-green-500 focus:ring-green-500 text-slate-900">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              <SelectItem value="all" className="text-slate-900">All Status</SelectItem>
              <SelectItem value="active" className="text-slate-900">Active</SelectItem>
              <SelectItem value="inactive" className="text-slate-900">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
            <SelectTrigger className="h-11 border-slate-300 focus:border-green-500 focus:ring-green-500 text-slate-900">
              <SelectValue placeholder="Filter by performance" />
            </SelectTrigger>
            <SelectContent className="bg-white border-slate-200">
              <SelectItem value="all" className="text-slate-900">All Performance</SelectItem>
              <SelectItem value="high" className="text-slate-900">High (80%+)</SelectItem>
              <SelectItem value="medium" className="text-slate-900">Medium (60-79%)</SelectItem>
              <SelectItem value="low" className="text-slate-900">Low (&lt;60%)</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="h-11 border-slate-300 hover:bg-slate-50 text-slate-700 font-medium">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Enhanced ASHA List */}
      <div className="grid gap-4 lg:gap-6">
        {filteredAshas.map((asha) => (
          <Card key={asha.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                {/* Profile Section */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <Avatar className="h-16 w-16 border-2 border-slate-100 flex-shrink-0">
                    <AvatarImage src={asha.profileImage} alt={asha.name} />
                    <AvatarFallback className="bg-green-50 text-green-700 font-bold text-lg">
                      {asha.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-2 min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">{asha.name}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm">
                      <div className="flex items-center gap-2 text-slate-700">
                        <MapPin className="h-4 w-4 text-slate-500 flex-shrink-0" />
                        <span className="font-medium">{asha.village}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <Phone className="h-4 w-4 text-slate-500 flex-shrink-0" />
                        <span>{asha.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <Users className="h-4 w-4 text-slate-500 flex-shrink-0" />
                        <span>{asha.population.toLocaleString()} people</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status and Performance */}
                <div className="flex flex-row lg:flex-col items-center lg:text-center gap-3 lg:gap-3">
                  <Badge 
                    variant={asha.status === 'active' ? 'default' : 'secondary'}
                    className={`font-medium ${
                      asha.status === 'active' 
                        ? 'bg-green-50 text-green-800 border-green-200' 
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    {asha.status.charAt(0).toUpperCase() + asha.status.slice(1)}
                  </Badge>
                  {getPerformanceBadge(asha.performance)}
                </div>

                {/* Performance Metrics */}
                <div className="flex flex-row lg:flex-col items-center lg:text-center gap-3 lg:gap-3 lg:min-w-[120px]">
                  <div className="flex items-center justify-center gap-2">
                    {getTrendIcon(asha.trend)}
                    <span className="text-2xl font-bold text-slate-900">{asha.performance}%</span>
                  </div>
                  <div className="w-24 lg:w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${asha.performance}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-600 font-medium">Performance Score</p>
                </div>

                {/* Actions */}
                <div className="flex flex-row lg:flex-col gap-2">
                  <Button variant="outline" size="sm" className="border-slate-300 hover:bg-slate-50 text-slate-700 font-medium">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="border-slate-300 hover:bg-slate-50 text-slate-700 font-medium">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Empty State */}
      {filteredAshas.length === 0 && (
        <Card className="bg-white rounded-2xl shadow-sm border border-slate-200">
          <CardContent className="p-12 text-center">
            <div className="p-6 bg-green-50 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center border border-green-100">
              <Users className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No ASHAs Found</h3>
            <p className="text-slate-600 mb-4">
              {searchTerm || statusFilter !== 'all' || performanceFilter !== 'all' 
                ? 'Try adjusting your filters to see more results'
                : 'No ASHA workers have been added yet'
              }
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setPerformanceFilter('all');
              }}
              className="border-slate-300 hover:bg-slate-50 text-slate-700 font-medium"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export { AshaList };
