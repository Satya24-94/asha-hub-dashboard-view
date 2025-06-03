
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface InteractiveCardProps {
  title: string;
  value: number;
  target?: number;
  trend?: number;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  icon?: React.ElementType;
}

export const InteractiveCard = ({ 
  title, 
  value, 
  target, 
  trend, 
  description, 
  children, 
  className = '',
  icon: Icon 
}: InteractiveCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Format numbers to one decimal place
  const formattedValue = typeof value === 'number' ? value.toFixed(1) : value;
  const formattedTarget = target ? target.toFixed(1) : undefined;
  const formattedTrend = trend ? Math.abs(trend).toFixed(1) : undefined;
  
  const percentage = target ? Math.round((value / target) * 100) : 0;
  const isPositiveTrend = trend && trend > 0;

  return (
    <TooltipProvider>
      <Card 
        className={`cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 border-emerald-100 bg-gradient-to-br from-white to-emerald-50 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setExpanded(!expanded)}
      >
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {Icon && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="p-1.5 bg-emerald-100 rounded-full transition-all duration-300 hover:bg-emerald-200 hover:scale-110">
                      <Icon className="h-4 w-4 text-emerald-600 transition-colors duration-300 hover:text-emerald-700" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{title}</p>
                  </TooltipContent>
                </Tooltip>
              )}
              <span className="text-emerald-800 font-semibold">{title}</span>
            </div>
            <div className="flex items-center gap-2">
              {trend !== undefined && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`flex items-center text-xs px-2 py-1 rounded-full transition-all duration-300 hover:scale-110 ${
                      isPositiveTrend 
                        ? 'text-green-700 bg-green-100 hover:bg-green-200' 
                        : 'text-red-700 bg-red-100 hover:bg-red-200'
                    }`}>
                      {isPositiveTrend ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {formattedTrend}%
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isPositiveTrend ? 'Positive' : 'Negative'} trend: {formattedTrend}%</p>
                  </TooltipContent>
                </Tooltip>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="p-1 rounded-full hover:bg-emerald-100 transition-all duration-300 hover:scale-110">
                    {expanded ? 
                      <ChevronUp className="h-4 w-4 text-emerald-600" /> : 
                      <ChevronDown className="h-4 w-4 text-emerald-600" />
                    }
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{expanded ? 'Collapse' : 'Expand'} details</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-emerald-900 transition-all duration-300 hover:text-emerald-700">
                {formattedValue}
              </span>
              {target && (
                <Badge 
                  variant={percentage >= 80 ? "default" : percentage >= 60 ? "secondary" : "destructive"}
                  className="animate-pulse hover:animate-none transition-all duration-300 hover:scale-110"
                >
                  {percentage}%
                </Badge>
              )}
            </div>
            
            {target && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-emerald-700">
                  <span className="font-medium">Progress</span>
                  <span>Target: {formattedTarget}</span>
                </div>
                <Progress 
                  value={percentage} 
                  className={`h-2 transition-all duration-500 ${isHovered ? 'h-3' : ''} bg-emerald-100`}
                />
              </div>
            )}
            
            {description && (
              <p className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded-md">{description}</p>
            )}
            
            {expanded && children && (
              <div className="mt-4 p-4 bg-emerald-50 rounded-lg animate-fade-in border border-emerald-200">
                {children}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
