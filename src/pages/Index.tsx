
import React from "react";
import { FacilitatorDashboard } from "@/components/dashboards/FacilitatorDashboard";
import { AshaDashboard } from "@/components/dashboards/AshaDashboard";
import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  // Route based on user role
  const isAsha = profile?.role === 'asha';
  const isFacilitator = profile?.role === 'asha_facilitator';

  return (
    <div className="relative">
      <Navigation />
      {isAsha ? <AshaDashboard /> : <FacilitatorDashboard />}
    </div>
  );
};

export default Index;
