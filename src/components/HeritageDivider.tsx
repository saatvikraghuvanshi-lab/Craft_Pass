import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeritageDividerProps {
  className?: string;
  icon?: React.ReactNode;
}

export const HeritageDivider: React.FC<HeritageDividerProps> = ({
  className = '',
  icon,
}) => {
  return (
    <div className={`w-full max-w-7xl mx-auto px-4 md:px-12 py-8 flex items-center justify-center opacity-60 ${className}`}>
      <div className="h-[1px] bg-[#dbc1b8] flex-1"></div>
      <div className="px-4 text-[#994422] flex items-center">
        {icon || <Sparkles className="w-4 h-4" />}
      </div>
      <div className="h-[1px] bg-[#dbc1b8] flex-1"></div>
    </div>
  );
};
