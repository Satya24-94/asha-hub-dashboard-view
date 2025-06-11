
import React, { useState } from 'react';
import { AddAshaModal } from '@/components/AddAshaModal';
import { AshaProfileModal } from '@/components/AshaProfileModal';
import { CombinedPerformanceModal } from '@/components/CombinedPerformanceModal';
import { DashboardHeader } from '@/components/asha-management/DashboardHeader';
import { AshaStatsGrid } from '@/components/asha-management/AshaStatsGrid';
import { AshaSearchControls } from '@/components/asha-management/AshaSearchControls';
import { AshaGridView } from '@/components/asha-management/AshaGridView';
import { AshaEmptyState } from '@/components/asha-management/AshaEmptyState';
import { FloatingAddButton } from '@/components/asha-management/FloatingAddButton';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
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
    console.log('Adding ASHA with ID:', selectedAshaId);
    
    const ashaToAdd = availableAshas.find(asha => asha.id === selectedAshaId);
    
    if (!ashaToAdd) {
      toast({
        title: "Error",
        description: "Selected ASHA not found. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    if (ashas.length >= 20) {
      toast({
        title: "Limit Reached",
        description: "Maximum 20 ASHAs allowed per facilitator",
        variant: "destructive"
      });
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
    
    toast({
      title: "ASHA Added Successfully",
      description: `${ashaToAdd.name} has been added to your team.`,
    });
  };

  const handleRemoveAsha = (id: string) => {
    const ashaToRemove = ashas.find(asha => asha.id === id);
    setAshas(prev => prev.filter(asha => asha.id !== id));
    setSelectedAshas(prev => prev.filter(ashaId => ashaId !== id));
    
    if (ashaToRemove) {
      toast({
        title: "ASHA Removed",
        description: `${ashaToRemove.name} has been removed from your team.`,
      });
    }
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
    if (selectedAshas.length === 0) {
      toast({
        title: "No ASHAs Selected",
        description: "Please select at least one ASHA to view combined performance.",
        variant: "destructive"
      });
      return;
    }
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
    
    toast({
      title: "Export Successful",
      description: `${asha.name}'s report has been downloaded.`,
    });
  };

  const handleExportAll = () => {
    if (selectedAshas.length === 0) {
      toast({
        title: "No ASHAs Selected",
        description: "Please select at least one ASHA to export.",
        variant: "destructive"
      });
      return;
    }
    
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
    
    toast({
      title: "Export Successful",
      description: `Report for ${selectedData.length} ASHAs has been downloaded.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50/20">
      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
        <DashboardHeader
          selectedAshasCount={selectedAshas.length}
          onViewCombinedPerformance={handleViewCombinedPerformance}
          onExportAll={handleExportAll}
        />

        <AshaStatsGrid ashas={ashas} targets={targets} />

        <AshaSearchControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filteredAshas={filteredAshas}
          selectedAshas={selectedAshas}
          onSelectAll={handleSelectAll}
        />

        {filteredAshas.length > 0 ? (
          <AshaGridView
            ashas={filteredAshas}
            selectedAshas={selectedAshas}
            onSelectAsha={handleSelectAsha}
            onViewProfile={handleViewProfile}
            onRemoveAsha={handleRemoveAsha}
            onExportSingle={handleExportSingle}
          />
        ) : ashas.length === 0 ? (
          <AshaEmptyState onAddAsha={() => setIsAddModalOpen(true)} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No ASHAs found matching your search criteria.</p>
          </div>
        )}
      </div>

      {ashas.length > 0 && (
        <FloatingAddButton
          onClick={() => setIsAddModalOpen(true)}
          disabled={ashas.length >= 20}
        />
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
