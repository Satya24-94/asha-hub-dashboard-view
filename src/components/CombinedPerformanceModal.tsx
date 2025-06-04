
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  TrendingUp, 
  MapPin,
  Download,
  BarChart3
} from 'lucide-react';

interface AshaData {
  id: string;
  name: string;
  village: string;
  phone: string;
  population: number;
  performance: number;
  trend: 'up' | 'down' | 'stable';
  status: 'active' | 'inactive';
  profileImage?: string;
}

interface CombinedPerformanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAshas: AshaData[];
}

export const CombinedPerformanceModal = ({ isOpen, onClose, selectedAshas }: CombinedPerformanceModalProps) => {
  const totalPopulation = selectedAshas.reduce((sum, asha) => sum + asha.population, 0);
  const averagePerformance = selectedAshas.length > 0 
    ? selectedAshas.reduce((sum, asha) => sum + asha.performance, 0) / selectedAshas.length
    : 0;

  const handleExportCombined = () => {
    alert(`Exporting combined performance data for ${selectedAshas.length} ASHAs...`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-emerald-600" />
            <div>
              <h2 className="text-xl font-bold">Combined Performance Analysis</h2>
              <p className="text-sm text-gray-600">{selectedAshas.length} ASHAs Selected</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-700">{selectedAshas.length}</p>
                <p className="text-sm text-blue-600">Total ASHAs</p>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-700">{totalPopulation.toLocaleString()}</p>
                <p className="text-sm text-green-600">Total Population</p>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-700">{Math.round(averagePerformance)}%</p>
                <p className="text-sm text-purple-600">Avg Performance</p>
              </CardContent>
            </Card>
          </div>

          {/* Overall Performance Bar */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Overall Performance</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Combined Team Performance</span>
                  <span className="text-lg font-bold text-emerald-700">{Math.round(averagePerformance)}%</span>
                </div>
                <Progress value={averagePerformance} className="h-4" />
              </div>
            </CardContent>
          </Card>

          {/* Individual ASHA Performance */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Individual Performance Breakdown</h3>
              <div className="space-y-4">
                {selectedAshas.map((asha) => (
                  <div key={asha.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={asha.profileImage} alt={asha.name} />
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold text-sm">
                        {asha.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <div>
                          <p className="font-medium text-sm">{asha.name}</p>
                          <p className="text-xs text-gray-600">{asha.village} • {asha.population} people</p>
                        </div>
                        <span className="text-sm font-bold">{asha.performance}%</span>
                      </div>
                      <Progress value={asha.performance} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Categories */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-xl font-bold text-green-700">
                    {selectedAshas.filter(a => a.performance >= 90).length}
                  </p>
                  <p className="text-xs text-green-600">Excellent (90%+)</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-xl font-bold text-blue-700">
                    {selectedAshas.filter(a => a.performance >= 80 && a.performance < 90).length}
                  </p>
                  <p className="text-xs text-blue-600">Good (80-89%)</p>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <p className="text-xl font-bold text-yellow-700">
                    {selectedAshas.filter(a => a.performance >= 70 && a.performance < 80).length}
                  </p>
                  <p className="text-xs text-yellow-600">Average (70-79%)</p>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <p className="text-xl font-bold text-red-700">
                    {selectedAshas.filter(a => a.performance < 70).length}
                  </p>
                  <p className="text-xs text-red-600">Needs Improvement (&lt;70%)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Close
          </Button>
          <Button onClick={handleExportCombined} className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Export Combined Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
