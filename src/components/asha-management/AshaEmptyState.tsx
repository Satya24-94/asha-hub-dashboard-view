
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Plus } from 'lucide-react';

interface AshaEmptyStateProps {
  onAddAsha: () => void;
}

export const AshaEmptyState = ({ onAddAsha }: AshaEmptyStateProps) => {
  return (
    <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-200">
      <div className="p-6 bg-green-50 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center border border-green-100">
        <Users className="h-12 w-12 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 mb-2">Welcome to ASHA Management</h3>
      <p className="text-slate-600 mb-2">Start building your ASHA team for better community health coverage</p>
      <p className="text-sm text-slate-500 mb-8">Add ASHAs from your designated area to begin monitoring and supporting their work</p>
      <Button 
        onClick={onAddAsha}
        className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3 font-medium shadow-sm"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add Your First ASHA
      </Button>
    </div>
  );
};
