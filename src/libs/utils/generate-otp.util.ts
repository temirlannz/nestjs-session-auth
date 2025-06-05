export function generateOtp(digits: number = 6): number {
  if (digits < 1) throw new Error('OTP must be at least 1 digit long');

  const min = Math.pow(10, digits - 1); //smallest of 6 digit number, e.g., 100000
  const max = Math.pow(10, digits) - 1; //largest of 6 digit number, e.g., 999999

  return Math.floor(min + Math.random() * (max - min + 1)); //random number between min and max
}
