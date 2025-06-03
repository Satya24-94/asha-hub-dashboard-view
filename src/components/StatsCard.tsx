
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
  iconColor?: string;
}

export const StatsCard = React.memo(({ title, value, icon: Icon, gradient, iconColor = "text-white" }: StatsCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Format numerical values to one decimal place
  const formattedValue = typeof value === 'number' ? value.toFixed(1) : value;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card 
            className={`${gradient} border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 cursor-pointer`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className={`p-3 bg-white/30 rounded-full backdrop-blur-sm transition-all duration-300 ${
                  isHovered ? 'scale-110 bg-white/40' : ''
                }`}>
                  <Icon className={`h-7 w-7 ${iconColor} transition-all duration-300 ${
                    isHovered ? 'scale-110' : ''
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/90 font-medium mb-1">{title}</p>
                  <p className="text-3xl font-bold text-white transition-all duration-300 hover:scale-105">
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

StatsCard.displayName = "StatsCard";
