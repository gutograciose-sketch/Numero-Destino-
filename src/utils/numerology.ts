/**
 * Calculation Rule:
 * 1. Sum all digits of DD/MM/AAAA.
 * 2. If sum is 11, 22, or 33 (Master Numbers), stop.
 * 3. Else, if sum > 9, reduce by adding digits again until reaching a result between 1 and 9.
 */
export function calculateDestinyNumber(dateString: string): number {
  // Remove non-digits
  const digits = dateString.replace(/\D/g, '');
  if (!digits) return 0;

  // Sum all digits individualy (Step 1)
  let sum = digits.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);

  // Check for Master Numbers (Step 2)
  if (sum === 11 || sum === 22 || sum === 33) {
    return sum;
  }

  // Reduce to single digit if not a Master Number and > 9 (Step 3)
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }

  return sum;
}
