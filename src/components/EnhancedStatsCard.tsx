
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

  // Define proper gradient classes with better visibility
  const getGradientClass = (gradientName: string) => {
    switch (gradientName) {
      case 'blue-gradient':
        return 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-blue-100';
      case 'green-gradient':
        return 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-emerald-100';
      case 'purple-gradient':
        return 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-purple-100';
      case 'pink-gradient':
        return 'bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-pink-100';
      case 'orange-gradient':
        return 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-orange-100';
      case 'teal-gradient':
        return 'bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-teal-100';
      default:
        return 'bg-gradient-to-br from-slate-500 to-slate-600 text-white shadow-slate-100';
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className={`${getGradientClass(gradient)} border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105`}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
                  <Icon className="h-6 w-6 text-white drop-shadow-sm" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/95 font-medium mb-2 tracking-wide">
                    {title}
                  </p>
                  <p className="text-3xl font-bold text-white drop-shadow-sm leading-none">
                    {formattedValue}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent className="bg-white border border-gray-200 shadow-lg">
          <p className="text-gray-800 font-medium">{title}: {formattedValue}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

EnhancedStatsCard.displayName = "EnhancedStatsCard";
