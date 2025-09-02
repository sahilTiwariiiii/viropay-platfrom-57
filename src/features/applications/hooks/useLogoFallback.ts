
import { useState, useEffect } from 'react';
import { getLogoUrl, getGenericAvatarUrls } from '../utils/logoUtils';
import { getCachedLogoUrl, cacheLogoUrl, markUrlAsInvalid, generateCacheKey } from '../utils/logoCache';

interface UseLogoFallbackProps {
  logoUrl?: string;
  logo?: string;
  name: string;
}

interface UseLogoFallbackResult {
  finalLogoUrl: string | null;
  imageError: boolean;
  setImageError: (value: boolean) => void;
  fallbackAttempt: number;
  shouldUseInitials: boolean;
}

export const useLogoFallback = ({ logoUrl, logo, name }: UseLogoFallbackProps): UseLogoFallbackResult => {
  const [imageError, setImageError] = useState(false);
  const [fallbackAttempt, setFallbackAttempt] = useState(0);
  const [finalLogoUrl, setFinalLogoUrl] = useState<string | null>(null);
  const [shouldUseInitials, setShouldUseInitials] = useState(false);
  
  // Set initial URL
  useEffect(() => {
    // Reset error state when logoUrl changes
    setImageError(false);
    setFallbackAttempt(0);
    setShouldUseInitials(false);
    
    // Use the provided logo or logoUrl
    const initialLogoSource = logo || logoUrl;
    
    if (initialLogoSource) {
      // Try to get from cache first
      const cacheKey = generateCacheKey(name, 'initial');
      const cachedUrl = getCachedLogoUrl(cacheKey);
      
      if (cachedUrl) {
        setFinalLogoUrl(cachedUrl);
      } else {
        setFinalLogoUrl(initialLogoSource);
        // Cache the initial URL
        cacheLogoUrl(cacheKey, initialLogoSource);
      }
    } else {
      // If no initial URL, immediately go to fallback
      const genericUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=f1f5f9&color=475569&bold=true`;
      setFinalLogoUrl(genericUrl);
      cacheLogoUrl(generateCacheKey(name, 'initial-fallback'), genericUrl);
    }
  }, [logo, logoUrl, name]);

  // Handle fallback logic when image errors
  useEffect(() => {
    if (imageError) {
      // If current URL failed, mark it as invalid in the cache
      if (finalLogoUrl) {
        const currentCacheKey = generateCacheKey(name, 'fallback', fallbackAttempt - 1);
        markUrlAsInvalid(currentCacheKey);
      }
      
      // Use initials immediately if we've tried multiple fallbacks
      if (fallbackAttempt >= 3) {
        setShouldUseInitials(true);
        return;
      }
      
      // Try to get from cache first
      const cacheKey = generateCacheKey(name, 'fallback', fallbackAttempt);
      const cachedUrl = getCachedLogoUrl(cacheKey);
      
      if (cachedUrl) {
        setFinalLogoUrl(cachedUrl);
        setFallbackAttempt(prev => prev + 1);
        setImageError(false);
        return;
      }
      
      const nextFallback = getLogoUrl(name, fallbackAttempt);
      
      if (nextFallback) {
        setFinalLogoUrl(nextFallback);
        // Cache the fallback URL
        cacheLogoUrl(cacheKey, nextFallback);
        setFallbackAttempt(prev => prev + 1);
        setImageError(false);
      } else if (fallbackAttempt < 6) {
        // Try generic avatar approaches if we're out of specific options
        const genericUrls = getGenericAvatarUrls(name);
        
        const fallbackIndex = fallbackAttempt - 3;
        if (fallbackIndex >= 0 && fallbackIndex < genericUrls.length) {
          const genericUrl = genericUrls[fallbackIndex];
          setFinalLogoUrl(genericUrl);
          // Cache the generic URL
          cacheLogoUrl(cacheKey, genericUrl);
          setFallbackAttempt(prev => prev + 1);
          setImageError(false);
        } else {
          setShouldUseInitials(true);
        }
      } else {
        setShouldUseInitials(true);
      }
    }
  }, [imageError, fallbackAttempt, name, finalLogoUrl]);

  return {
    finalLogoUrl,
    imageError,
    setImageError,
    fallbackAttempt,
    shouldUseInitials
  };
};
