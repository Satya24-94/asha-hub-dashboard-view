
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PerformanceMetricProps {
  label: string;
  value: number;
  showPercentage?: boolean;
  className?: string;
}

export const PerformanceMetric = React.memo(({ label, value, showPercentage = true, className = "" }: PerformanceMetricProps) => {
  // Format value to one decimal place
  const formattedValue = value.toFixed(1);
  
  return (
    <TooltipProvider>
      <div className={`space-y-3 ${className}`}>
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700">{label}</span>
          {showPercentage && (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md hover:bg-emerald-100 smooth-transition cursor-pointer">
                  {formattedValue}%
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{label}: {formattedValue}%</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <Progress 
          value={value} 
          className="h-3 bg-gray-100 smooth-transition" 
          aria-label={`${label}: ${formattedValue}${showPercentage ? '%' : ''}`}
        />
      </div>
    </TooltipProvider>
  );
});

PerformanceMetric.displayName = "PerformanceMetric";
