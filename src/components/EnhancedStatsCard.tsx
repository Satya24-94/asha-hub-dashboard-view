
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface EnhancedStatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
  iconColor?: string;
  isWholeNumber?: boolean;
}

export const EnhancedStatsCard = React.memo(({ 
  title, 
  value, 
  icon: Icon, 
  gradient, 
  iconColor = "text-white",
  isWholeNumber = false 
}: EnhancedStatsCardProps) => {
  // Format numerical values based on isWholeNumber flag
  const formattedValue = typeof value === 'number' 
    ? (isWholeNumber ? value.toString() : value.toFixed(1))
    : value;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className={`${gradient} border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer`}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Icon className={`h-6 w-6 ${iconColor}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/90 font-medium mb-1">{title}</p>
                  <p className="text-2xl font-bold text-white">
                    {formattedValue}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent>
          <p>{title}: {formattedValue}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

EnhancedStatsCard.displayName = "EnhancedStatsCard";
