
import React from 'react';

interface ActivityItemProps {
  activity: {
    id: number;
    asha: string;
    action: string;
    time: string;
    type: 'success' | 'warning' | 'info';
  };
}

const getActivityColor = (type: string) => {
  switch (type) {
    case 'success': return 'bg-emerald-500';
    case 'warning': return 'bg-amber-500';
    default: return 'bg-blue-500';
  }
};

const getActivityBg = (type: string) => {
  switch (type) {
    case 'success': return 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100';
    case 'warning': return 'bg-amber-50 border-amber-200 hover:bg-amber-100';
    default: return 'bg-blue-50 border-blue-200 hover:bg-blue-100';
  }
};

export const ActivityItem = React.memo(({ activity }: ActivityItemProps) => {
  return (
    <div className={`flex items-start space-x-3 p-4 ${getActivityBg(activity.type)} rounded-lg border transition-all duration-200`}>
      <div className={`h-3 w-3 rounded-full mt-2 ${getActivityColor(activity.type)} ring-2 ring-white shadow-sm`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-900 truncate">{activity.asha}</p>
        <p className="text-sm text-slate-700 mt-1">{activity.action}</p>
        <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
      </div>
    </div>
  );
});

ActivityItem.displayName = "ActivityItem";
