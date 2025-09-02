
/**
 * Simple cache for storing logo URLs to avoid unnecessary API calls
 */

interface CacheEntry {
  url: string;
  timestamp: number;
  valid: boolean; // Whether the URL is valid (image loaded successfully)
}

// In-memory cache object
const logoCache: Record<string, CacheEntry> = {};

// Cache expiration time in milliseconds (24 hours)
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;

/**
 * Get a cached logo URL if available and not expired
 */
export const getCachedLogoUrl = (key: string): string | null => {
  const entry = logoCache[key];
  
  // If no entry or entry is expired, return null
  if (!entry || Date.now() - entry.timestamp > CACHE_EXPIRATION) {
    return null;
  }
  
  // Only return valid URLs
  return entry.valid ? entry.url : null;
};

/**
 * Store a logo URL in the cache
 */
export const cacheLogoUrl = (key: string, url: string, valid: boolean = true): void => {
  logoCache[key] = {
    url,
    timestamp: Date.now(),
    valid
  };
};

/**
 * Mark a URL as invalid in the cache
 */
export const markUrlAsInvalid = (key: string): void => {
  if (logoCache[key]) {
    logoCache[key].valid = false;
  }
};

/**
 * Generate a cache key for a logo URL
 */
export const generateCacheKey = (name: string, source: string, attempt: number = 0): string => {
  return `${name.toLowerCase()}_${source}_${attempt}`;
};
