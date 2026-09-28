const NAME_RE = /^\p{L}[\p{L}\s.'’-]*$/u;
const PHONE_RE = /^[6-9]\d{9}$/;

/**
 * Digits only, max 10. Handles pasted/autofilled "+91 98765 43210" and "098765 43210".
 * Only strips a country/trunk prefix when the input is clearly longer than 10 digits,
 * so a genuine number that happens to start with 91 is never mangled.
 */
export function normalizePhone(raw) {
  let digits = String(raw).replace(/\D/g, '');
  if (digits.length >= 12 && digits.startsWith('91')) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return digits.slice(0, 10);
}

export function validateName(value) {
  const v = value.trim();
  if (!v) return 'Please enter your name.';
  if (v.length < 2) return 'Name looks too short.';
  if (v.length > 60) return 'Name is too long.';
  if (!NAME_RE.test(v)) return 'Use letters only, no numbers or symbols.';
  return '';
}

export function validatePhone(value) {
  if (!value) return 'Please enter your mobile number.';
  if (value.length < 10) return 'Enter all 10 digits.';
  if (!PHONE_RE.test(value)) return 'Enter a valid Indian mobile number (starts with 6–9).';
  if (/^(\d)\1{9}$/.test(value)) return 'That number doesn’t look right.';
  return '';
}

export function validateClaim({ name, phone }) {
  return { name: validateName(name), phone: validatePhone(phone) };
}
