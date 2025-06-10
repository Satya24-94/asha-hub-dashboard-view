
import React from 'react';
import { Button } from '@/components/ui/button';
import { Activity, TrendingUp, FileSpreadsheet } from 'lucide-react';

interface DashboardHeaderProps {
  selectedAshasCount: number;
  onViewCombinedPerformance: () => void;
  onExportAll: () => void;
}

export const DashboardHeader = ({ 
  selectedAshasCount, 
  onViewCombinedPerformance, 
  onExportAll 
}: DashboardHeaderProps) => {
  return (
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
        
        {selectedAshasCount > 0 && (
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Button 
              onClick={onViewCombinedPerformance}
              className="bg-green-600 hover:bg-green-700 text-white shadow-sm border-0 font-medium"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Combined Analysis ({selectedAshasCount})
            </Button>
            <Button 
              onClick={onExportAll}
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
  );
};
