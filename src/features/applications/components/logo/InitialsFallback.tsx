
import React from 'react';
import { Package } from 'lucide-react';
import { getInitials } from '../../utils/logoUtils';

interface InitialsFallbackProps {
  name: string;
  size: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12"
};

const InitialsFallback: React.FC<InitialsFallbackProps> = ({ name, size, className = "" }) => {
  const initials = getInitials(name);
  const fallbackLetter = name.charAt(0).toUpperCase();
  
  return (
    <div className={`${sizeClasses[size]} rounded overflow-hidden flex items-center justify-center bg-gray-100 border ${className}`}>
      <div className="h-full w-full flex items-center justify-center text-sm font-medium text-gray-700">
        {initials || fallbackLetter || <Package className="w-5 h-5 text-gray-500" />}
      </div>
    </div>
  );
};

export default InitialsFallback;
