
import React from "react";
import { FacilitatorDashboard } from "@/components/dashboards/FacilitatorDashboard";

const Index = () => {
  // Skip authentication and go directly to dashboard
  return <FacilitatorDashboard />;
};

export default Index;
