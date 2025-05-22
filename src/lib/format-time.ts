/**
 * Formats a UTC date into a readable string showing date, month and time
 * @param date - UTC date string or Date object
 * @returns Formatted date string (e.g. "25 March, 2:30 PM" or "25 March 2023, 2:30 PM" for past years)
 */
export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (Number.isNaN(dateObj.getTime())) {
    return "Invalid date";
  }

  const currentYear = new Date().getFullYear();
  const dateYear = dateObj.getFullYear();

  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    year: dateYear !== currentYear ? "numeric" : undefined,
  });

  return formatter.format(dateObj);
}
