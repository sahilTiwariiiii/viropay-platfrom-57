
import React from 'react';
import { Bell, ChevronLeft, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  subtitle, 
  showBackButton = false,
  onBackClick 
}) => {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="py-5 px-8 border-b border-gray-100 flex items-center justify-between animate-fade-in">
      <div className="flex items-center">
        {showBackButton && (
          <button 
            onClick={handleBackClick}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        <div>
          <h1 className="text-xl font-display font-semibold">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-saas-blue rounded-full"></span>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
