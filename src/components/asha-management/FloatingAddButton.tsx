
import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingAddButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const FloatingAddButton = ({ onClick, disabled }: FloatingAddButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={disabled}
      title="Add ASHA Worker"
    >
      <Plus className="h-8 w-8" />
    </button>
  );
};
