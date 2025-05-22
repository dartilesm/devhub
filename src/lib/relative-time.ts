/**
 * Takes a UTC date and returns a relative time string
 * For times less than 24 hours ago, returns format like "5h", "3m", "30s"
 * For older times, returns the date in format "May 9"
 * @param date - The date to get the relative time of
 * @returns The relative time or date string
 */
export function getRelativeTime(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diff / 1000);

  // Define time units in seconds
  const MINUTE = 60;
  const HOUR = MINUTE * 60;
  const DAY = HOUR * 24;

  // If more than 24 hours, return the date
  if (diffInSeconds >= DAY) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  }

  // For less than 24 hours, return concise format
  if (diffInSeconds < MINUTE) {
    return `${diffInSeconds}s`;
  }
  if (diffInSeconds < HOUR) {
    return `${Math.floor(diffInSeconds / MINUTE)}m`;
  }
  return `${Math.floor(diffInSeconds / HOUR)}h`;
}
