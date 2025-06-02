
import React from "react";
import { FacilitatorDashboard } from "@/components/dashboards/FacilitatorDashboard";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  return (
    <div className="relative">
      <Navigation />
      <FacilitatorDashboard />
    </div>
  );
};

export default Index;
