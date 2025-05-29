
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
    case 'success': return 'bg-green-500';
    case 'warning': return 'bg-yellow-500';
    default: return 'bg-blue-500';
  }
};

export const ActivityItem = React.memo(({ activity }: ActivityItemProps) => {
  return (
    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-150">
      <div className={`h-2 w-2 rounded-full mt-2 ${getActivityColor(activity.type)}`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{activity.asha}</p>
        <p className="text-sm text-gray-600">{activity.action}</p>
        <p className="text-xs text-gray-400">{activity.time}</p>
      </div>
    </div>
  );
});

ActivityItem.displayName = "ActivityItem";
