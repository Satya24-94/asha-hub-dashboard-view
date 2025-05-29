
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Shield } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  userInitials?: string;
  userImage?: string;
}

export const DashboardHeader = React.memo(({ 
  title, 
  subtitle, 
  userInitials = "AD", 
  userImage 
}: DashboardHeaderProps) => {
  return (
    <div className="bg-white shadow-sm border-b border-emerald-100 sticky top-0 z-50">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-full">
              <Heart className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-emerald-800">{title}</h1>
              <p className="text-sm text-emerald-600">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs text-emerald-600">ASHA Facilitator</p>
              <p className="text-sm font-medium text-emerald-800">Anita Devi</p>
            </div>
            <Avatar className="h-10 w-10 ring-2 ring-emerald-200">
              <AvatarImage src={userImage} alt="User avatar" />
              <AvatarFallback className="bg-emerald-500 text-white font-semibold">{userInitials}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
});

DashboardHeader.displayName = "DashboardHeader";
