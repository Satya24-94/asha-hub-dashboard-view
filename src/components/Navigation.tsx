
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAshaDashboard = location.pathname === '/asha-dashboard';

  const handleNavigation = () => {
    if (isAshaDashboard) {
      navigate('/');
    } else {
      navigate('/asha-dashboard');
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={handleNavigation}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        {isAshaDashboard ? (
          <>
            <ArrowLeft className="h-4 w-4 mr-2" />
            <Users className="h-4 w-4 mr-2" />
            Facilitator Dashboard
          </>
        ) : (
          <>
            <User className="h-4 w-4 mr-2" />
            ASHA Dashboard
            <ArrowRight className="h-4 w-4 ml-2" />
          </>
        )}
      </Button>
    </div>
  );
};
