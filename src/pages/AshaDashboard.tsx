
import React from "react";
import { AshaDashboard as AshaDashboardComponent } from "@/components/dashboards/AshaDashboard";
import { Navigation } from "@/components/Navigation";

const AshaDashboard = () => {
  return (
    <div className="relative">
      <Navigation />
      <AshaDashboardComponent />
    </div>
  );
};

export default AshaDashboard;
