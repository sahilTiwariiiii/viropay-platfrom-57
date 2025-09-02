
import React from 'react';
import { useLogoFallback } from '../hooks/useLogoFallback';
import InitialsFallback from './logo/InitialsFallback';
import { cacheLogoUrl, generateCacheKey } from '../utils/logoCache';

interface ApplicationLogoProps {
  logoUrl?: string;
  name: string;
  logo?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12"
};

const ApplicationLogo: React.FC<ApplicationLogoProps> = ({ 
  logoUrl, 
  name, 
  logo,
  className = "",
  size = 'md'
}) => {
  const {
    finalLogoUrl,
    imageError,
    setImageError,
    shouldUseInitials
  } = useLogoFallback({ logoUrl, logo, name });

  // Handle successful image load
  const handleImageLoad = () => {
    if (finalLogoUrl) {
      // Mark this URL as valid in the cache
      const cacheKey = generateCacheKey(name, 'success');
      cacheLogoUrl(cacheKey, finalLogoUrl, true);
    }
  };

  // Use initials fallback if we've tried multiple fallbacks or if no URL is available
  if (!finalLogoUrl || shouldUseInitials) {
    return <InitialsFallback name={name} size={size} className={className} />;
  }

  return (
    <div className={`${sizeClasses[size]} rounded overflow-hidden flex items-center justify-center bg-white border ${className}`}>
      <img 
        src={finalLogoUrl} 
        alt={`${name} logo`}
        className="w-full h-full object-contain p-1"
        onError={() => setImageError(true)}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default ApplicationLogo;
