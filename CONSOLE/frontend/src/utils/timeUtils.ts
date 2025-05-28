/**
 * Formats a Date object into a relative time string (e.g., "2m ago")
 */
export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  return `${diffInHours}h ago`;
};

/**
 * Formats a time in minutes into a display string (e.g., "15 min")
 */
export const formatTime = (minutes?: number): string => {
  if (!minutes) return '-';
  return `${minutes} min`;
};