
import React from 'react';
import { Button } from "@/components/ui/button";
import { Users, Heart, Calendar, TrendingUp } from "lucide-react";

const navItems = [
  { icon: Users, label: "Dashboard", active: true },
  { icon: Heart, label: "Health", active: false },
  { icon: Calendar, label: "Schedule", active: false },
  { icon: TrendingUp, label: "Analytics", active: false },
];

export const BottomNavigation = React.memo(() => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-emerald-100 shadow-2xl safe-area-pb">
      <div className="grid grid-cols-4 py-2 max-w-7xl mx-auto">
        {navItems.map(({ icon: Icon, label, active }) => (
          <Button 
            key={label}
            variant="ghost" 
            className={`flex flex-col items-center py-3 h-auto transition-all duration-200 ${
              active 
                ? 'text-emerald-600 bg-emerald-50' 
                : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
            }`}
            aria-label={label}
          >
            <Icon className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
});

BottomNavigation.displayName = "BottomNavigation";
