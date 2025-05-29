
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface PerformanceMetricProps {
  label: string;
  value: number;
  showPercentage?: boolean;
  className?: string;
}

export const PerformanceMetric = React.memo(({ label, value, showPercentage = true, className = "" }: PerformanceMetricProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {showPercentage && <span className="text-sm text-gray-600">{value}%</span>}
      </div>
      <Progress 
        value={value} 
        className="h-2 bg-gray-200" 
        aria-label={`${label}: ${value}${showPercentage ? '%' : ''}`}
      />
    </div>
  );
});

PerformanceMetric.displayName = "PerformanceMetric";
