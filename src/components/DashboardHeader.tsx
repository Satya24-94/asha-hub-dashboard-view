
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  userInitials?: string;
  userImage?: string;
}

export const DashboardHeader = React.memo(({ 
  title, 
  subtitle, 
  userInitials = "AF", 
  userImage 
}: DashboardHeaderProps) => {
  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
          <Avatar className="h-10 w-10">
            <AvatarImage src={userImage} alt="User avatar" />
            <AvatarFallback className="bg-indigo-500 text-white">{userInitials}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
});

DashboardHeader.displayName = "DashboardHeader";
