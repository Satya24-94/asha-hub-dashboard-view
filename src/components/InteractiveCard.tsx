
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown } from 'lucide-react';

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

  const percentage = target ? Math.round((value / target) * 100) : 0;
  const isPositiveTrend = trend && trend > 0;

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setExpanded(!expanded)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4 text-blue-600" />}
            {title}
          </div>
          <div className="flex items-center gap-2">
            {trend !== undefined && (
              <div className={`flex items-center text-xs ${isPositiveTrend ? 'text-green-600' : 'text-red-600'}`}>
                {isPositiveTrend ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(trend)}%
              </div>
            )}
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
            {target && (
              <Badge 
                variant={percentage >= 80 ? "default" : percentage >= 60 ? "secondary" : "destructive"}
                className="animate-pulse"
              >
                {percentage}%
              </Badge>
            )}
          </div>
          
          {target && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Progress</span>
                <span>Target: {target}</span>
              </div>
              <Progress 
                value={percentage} 
                className={`h-2 transition-all duration-500 ${isHovered ? 'h-3' : ''}`}
              />
            </div>
          )}
          
          {description && (
            <p className="text-xs text-gray-600">{description}</p>
          )}
          
          {expanded && children && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg animate-fade-in">
              {children}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
