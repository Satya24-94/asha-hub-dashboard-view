
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

  // Format numbers to one decimal place
  const formattedValue = typeof value === 'number' ? value.toFixed(1) : value;
  const formattedTarget = target ? target.toFixed(1) : undefined;
  const formattedTrend = trend ? Math.abs(trend).toFixed(1) : undefined;
  
  const percentage = target ? Math.round((value / target) * 100) : 0;
  const isPositiveTrend = trend && trend > 0;

  return (
    <TooltipProvider>
      <Card 
        className={`cursor-pointer smooth-transition hover:shadow-md border-gray-200 bg-white ${className}`}
        onClick={() => setExpanded(!expanded)}
      >
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {Icon && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="p-1.5 bg-blue-100 rounded-full smooth-transition hover:bg-blue-200">
                      <Icon className="h-4 w-4 text-blue-600" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{title}</p>
                  </TooltipContent>
                </Tooltip>
              )}
              <span className="text-gray-800 font-semibold">{title}</span>
            </div>
            <div className="flex items-center gap-2">
              {trend !== undefined && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`flex items-center text-xs px-2 py-1 rounded-full smooth-transition ${
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
                  <div className="p-1 rounded-full hover:bg-gray-100 smooth-transition">
                    {expanded ? 
                      <ChevronUp className="h-4 w-4 text-gray-600" /> : 
                      <ChevronDown className="h-4 w-4 text-gray-600" />
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
              <span className="text-3xl font-bold text-gray-900">
                {formattedValue}
              </span>
              {target && (
                <Badge 
                  variant={percentage >= 80 ? "default" : percentage >= 60 ? "secondary" : "destructive"}
                  className="smooth-transition"
                >
                  {percentage}%
                </Badge>
              )}
            </div>
            
            {target && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span className="font-medium">Progress</span>
                  <span>Target: {formattedTarget}</span>
                </div>
                <Progress 
                  value={percentage} 
                  className="h-2 bg-gray-100"
                />
              </div>
            )}
            
            {description && (
              <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded-md">{description}</p>
            )}
            
            {expanded && children && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                {children}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};
