
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
          <span className="text-sm font-semibold text-emerald-800">{label}</span>
          {showPercentage && (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-sm font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md hover:bg-emerald-100 transition-colors cursor-pointer">
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
          className="h-3 bg-emerald-100 hover:h-4 transition-all duration-300" 
          aria-label={`${label}: ${formattedValue}${showPercentage ? '%' : ''}`}
        />
      </div>
    </TooltipProvider>
  );
});

PerformanceMetric.displayName = "PerformanceMetric";
