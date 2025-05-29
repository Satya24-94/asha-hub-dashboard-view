
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

export const StatsCard = React.memo(({ title, value, icon: Icon, gradient, iconColor = "opacity-90" }: StatsCardProps) => {
  return (
    <Card className={`${gradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          <div>
            <p className="text-sm opacity-90 font-medium">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

StatsCard.displayName = "StatsCard";
