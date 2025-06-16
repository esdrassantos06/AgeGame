import romans from "romans";

export function validateBirthDateWithAge(
  birthDate: Date,
  romanAge: string
): boolean {
  if (!birthDate) return false;


  let numericAge: number;
  try {
    numericAge = romans.deromanize(romanAge.toUpperCase());
  } catch {
    return false;
  }

  const today = new Date();
  const birth = new Date(birthDate);

  let calculatedAge = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    calculatedAge--;
  }

  return calculatedAge === numericAge;
}

export function isValidRomanNumeral(roman: string): boolean {
    if (!roman) return false;
    try {
      const number = romans.deromanize(roman.toUpperCase());
      return number > 0;
    } catch {
      return false;
    }
  }