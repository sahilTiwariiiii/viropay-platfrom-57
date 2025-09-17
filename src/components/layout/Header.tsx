
import React, { useState } from 'react';
import { ChevronLeft, User } from 'lucide-react';
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
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  const handleLogout = () => {
    // Remove token and redirect to login
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
    <header className="py-3 px-6 border-b border-gray-100 flex items-center justify-between bg-white shadow-sm">
      <div className="flex items-center">
        {showBackButton && (
          <button 
            onClick={handleBackClick}
            className="mr-3 p-1.5 rounded-md hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        <div>
          <h1 className="text-lg font-medium text-gray-900">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <a href="#" className="text-sm text-primary hover:underline px-3 py-1.5 rounded">Support Center</a>
        <a href="#" className="text-sm text-white bg-primary hover:bg-primary/90 px-3 py-1.5 rounded-md">Facebook user group</a>
        <a href="#" className="text-sm text-primary hover:underline px-3 py-1.5 rounded">FAQ</a>
        
        {/* User profile dropdown */}
        <div className="relative group">
          <button className="flex items-center gap-2 hover:bg-gray-50 rounded-md px-2 py-1" aria-label="User menu">
            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
              <User className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-gray-700">Amit Bhaain</span>
          </button>
          <div className="hidden group-hover:block group-focus-within:block absolute right-0 mt-1 w-40 bg-white border border-gray-100 rounded shadow-md z-50">
            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setLogoutDialogOpen(true)}>Logout</button>
          </div>
        </div>
      </div>
    </header>
    {/* Logout Confirmation Dialog */}
    {logoutDialogOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px]">
          <div className="mb-4 text-lg font-semibold">Logout</div>
          <div className="mb-6">Are you sure you want to logout?</div>
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              onClick={() => setLogoutDialogOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              onClick={handleLogout}
            >
              Yes, Logout
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default Header;
