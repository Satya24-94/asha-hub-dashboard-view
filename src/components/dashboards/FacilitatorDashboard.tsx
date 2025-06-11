
import React, { useState } from 'react';
import { AshaManagementDashboard } from '@/components/AshaManagementDashboard';

export const FacilitatorDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50/20">
      {/* Add top padding to prevent navigation overlap */}
      <div className="pt-20">
        <AshaManagementDashboard />
      </div>
    </div>
  );
};
