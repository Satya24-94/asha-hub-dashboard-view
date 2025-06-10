
import React from 'react';
import { AshaCard } from './AshaCard';

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

interface AshaGridViewProps {
  ashas: AshaData[];
  selectedAshas: string[];
  onSelectAsha: (id: string, checked: boolean) => void;
  onViewProfile: (asha: AshaData) => void;
  onRemoveAsha: (id: string) => void;
  onExportSingle: (asha: AshaData) => void;
}

export const AshaGridView = ({ 
  ashas, 
  selectedAshas, 
  onSelectAsha, 
  onViewProfile, 
  onRemoveAsha, 
  onExportSingle 
}: AshaGridViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
      {ashas.map((asha) => (
        <AshaCard
          key={asha.id}
          asha={asha}
          isSelected={selectedAshas.includes(asha.id)}
          onSelect={onSelectAsha}
          onViewProfile={onViewProfile}
          onRemove={onRemoveAsha}
          onExport={onExportSingle}
        />
      ))}
    </div>
  );
};
