
import React from 'react';

interface ViropayLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white';
  showText?: boolean;
}

const ViropayLogo: React.FC<ViropayLogoProps> = ({ 
  size = 'md',
  variant = 'default',
  showText = true
}) => {
  const sizes = {
    sm: { logo: 'h-6 w-6', text: 'text-base' },
    md: { logo: 'h-8 w-8', text: 'text-xl' },
    lg: { logo: 'h-10 w-10', text: 'text-2xl' },
  };
  
  const colors = {
    default: {
      fill: 'text-blue-600',
      text: 'text-gray-900',
    },
    white: {
      fill: 'text-white',
      text: 'text-white',
    },
  };
  
  const { logo, text } = sizes[size];
  const { fill, text: textColor } = colors[variant];
  
  return (
    <div className="flex items-center gap-2">
      <svg 
        className={`${logo} ${fill}`} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-6h2v6zm4 0h-2V8h2v8z" 
          fill="currentColor"
        />
      </svg>
      {showText && (
        <span className={`font-display ${text} font-semibold ${textColor}`}>
          viropay
        </span>
      )}
    </div>
  );
};

export default ViropayLogo;
