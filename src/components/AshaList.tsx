
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
    // ... add more sample data
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
    if (performance >= 90) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    if (performance >= 80) return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
    if (performance >= 70) return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>;
    return <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">ASHA Workers Directory</h2>
            <p className="text-gray-600">Comprehensive list of all ASHA workers in your area</p>
          </div>
          <Badge variant="outline" className="text-lg px-3 py-1">
            {filteredAshas.length} ASHAs
          </Badge>
        </div>

        {/* Enhanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name or village..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Filter by performance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Performance</SelectItem>
              <SelectItem value="high">High (80%+)</SelectItem>
              <SelectItem value="medium">Medium (60-79%)</SelectItem>
              <SelectItem value="low">Low (<60%)</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="h-11">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Enhanced ASHA List */}
      <div className="grid gap-4">
        {filteredAshas.map((asha) => (
          <Card key={asha.id} className="asha-card hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                {/* Profile Section */}
                <div className="flex items-center gap-4 flex-1">
                  <Avatar className="h-16 w-16 border-2 border-gray-100">
                    <AvatarImage src={asha.profileImage} alt={asha.name} />
                    <AvatarFallback className="bg-green-100 text-green-700 font-bold text-lg">
                      {asha.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-gray-900">{asha.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {asha.village}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {asha.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {asha.population.toLocaleString()} people
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status and Performance */}
                <div className="text-center space-y-2">
                  <Badge variant={asha.status === 'active' ? 'default' : 'secondary'}>
                    {asha.status}
                  </Badge>
                  {getPerformanceBadge(asha.performance)}
                </div>

                {/* Performance Metrics */}
                <div className="text-center space-y-2 min-w-[120px]">
                  <div className="flex items-center justify-center gap-2">
                    {getTrendIcon(asha.trend)}
                    <span className="text-2xl font-bold text-gray-900">{asha.performance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${asha.performance}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">Performance Score</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredAshas.length === 0 && (
        <Card className="asha-card">
          <CardContent className="p-12 text-center">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No ASHAs Found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== 'all' || performanceFilter !== 'all' 
                ? 'Try adjusting your filters to see more results'
                : 'No ASHA workers have been added yet'
              }
            </p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setPerformanceFilter('all');
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export { AshaList };
