
import React from 'react';
import { Button } from "@/components/ui/button";
import { Users, DollarSign, Calendar, MapPin } from "lucide-react";

const navItems = [
  { icon: Users, label: "Dashboard", active: true },
  { icon: DollarSign, label: "Incentives", active: false },
  { icon: Calendar, label: "Schedule", active: false },
  { icon: MapPin, label: "Locations", active: false },
];

export const BottomNavigation = React.memo(() => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg safe-area-pb">
      <div className="grid grid-cols-4 py-2">
        {navItems.map(({ icon: Icon, label, active }) => (
          <Button 
            key={label}
            variant="ghost" 
            className={`flex flex-col items-center py-3 h-auto ${
              active ? 'text-indigo-600' : 'text-gray-600'
            }`}
            aria-label={label}
          >
            <Icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
});

BottomNavigation.displayName = "BottomNavigation";
