
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { LoginForm } from "@/components/auth/LoginForm";
import { FacilitatorDashboard } from "@/components/dashboards/FacilitatorDashboard";
import { AshaDashboard } from "@/components/dashboards/AshaDashboard";

const Index = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!user || !profile) {
    return <LoginForm />;
  }

  // Route based on user role
  switch (profile.role) {
    case 'asha_facilitator':
    case 'admin':
      return <FacilitatorDashboard />;
    case 'asha':
      return <AshaDashboard />;
    default:
      return <LoginForm />;
  }
};

export default Index;
