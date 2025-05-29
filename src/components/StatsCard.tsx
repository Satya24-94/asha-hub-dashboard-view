
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
  iconColor?: string;
}

export const StatsCard = React.memo(({ title, value, icon: Icon, gradient, iconColor = "opacity-80" }: StatsCardProps) => {
  return (
    <Card className={`${gradient} text-white border-0 shadow-md hover:shadow-lg transition-shadow duration-200`}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <Icon className={`h-8 w-8 ${iconColor}`} />
          <div>
            <p className="text-sm opacity-90">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

StatsCard.displayName = "StatsCard";
