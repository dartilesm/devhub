/**
 * Abbreviates a number (e.g., 1,356 → 1.3k, 8,200,512 → 8.2M)
 * @param value - The number to abbreviate
 * @returns The abbreviated string
 */
export function abbreviateNumber(value: number): string {
  if (value < 1000) return value.toString();
  const units = ["k", "M", "B", "T"];
  let unitIndex = -1;
  let num = value;
  while (num >= 1000 && unitIndex < units.length - 1) {
    num /= 1000;
    unitIndex++;
  }
  // Show one decimal if needed, but no trailing .0
  const numStr = num % 1 === 0 ? num.toFixed(0) : num.toFixed(1);
  return `${numStr.replace(".", ",")}${units[unitIndex]}`;
}
