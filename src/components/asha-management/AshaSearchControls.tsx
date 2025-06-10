
import React from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface AshaSearchControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filteredAshas: any[];
  selectedAshas: string[];
  onSelectAll: (checked: boolean) => void;
}

export const AshaSearchControls = ({ 
  searchTerm, 
  onSearchChange, 
  filteredAshas, 
  selectedAshas, 
  onSelectAll 
}: AshaSearchControlsProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search ASHAs by name or village..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-11 border-slate-300 focus:border-green-500 focus:ring-green-500 text-slate-900 placeholder:text-slate-500"
          />
        </div>
        {filteredAshas.length > 0 && (
          <div className="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
            <Checkbox
              id="select-all"
              checked={selectedAshas.length === filteredAshas.length}
              onCheckedChange={onSelectAll}
            />
            <label htmlFor="select-all" className="text-sm font-medium text-slate-700">
              Select All ({filteredAshas.length})
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
