import { FieldValidationResult } from 'lc-form-validation';
import { getLengthCountry } from './switchCountry';

const defaultInvalidMessage = 'Invalid IBAN';

const ibanPattern = /^[a-zA-Z]{2}[a-zA-Z0-9]*$/;

const isString = (input: any) =>
  typeof input === 'string' || input instanceof String;
const setupString = (input: string): string =>
  input.replace(/\s/g, '').toUpperCase();
const getCountry = (input: string) => input.substring(0, 2);
const isValidString = (input: any): boolean => ibanPattern.test(input);
const moveToBack = (input: string): string =>
  input.substring(4, input.length) + input.substring(0, 4);
const transformLetterToNumber = (input: string): string =>
  (input.charCodeAt(0) - 55).toString();

const parseIBAN = (input: string): string => {
  let result: string = '';
  for (const item of input) {
    /\d/.test(item)
      ? (result = result + item)
      : (result = result + transformLetterToNumber(item));
  }

  return result;
};

const checkNumber = (input: string): number => {
  let value: string = input;
  while (value.length >= 9) {
    const partial: string = value.substring(0, 9);
    const rest: string = value.substring(9);
    const num: number = +partial % 97;
    value = num.toString() + rest;
  }
  return +value % 97;
};

const isValidIBAN = (input: string): boolean => checkNumber(input) === 1;

export const VALIDATION_TYPE = 'IBAN';

/**
 * Check that the total IBAN length is correct as per the country. If not, the IBAN is invalid
 * Move the four initial characters to the end of the string
 * Replace each letter in the string with two digits, thereby expanding the string, where A = 10, B = 11, ..., Z = 35
 * Interpret the string as a decimal integer and compute the remainder of that number on division by 97
 * If the remainder is 1, the check digit test is passed and the IBAN might be valid.
 * @param value
 */
export const validateIBAN = (value: any): FieldValidationResult => {
  let valid: boolean = false;

  if (isString(value) && isValidString) {
    const fixedValue: string = setupString(value);
    const country: string = getCountry(fixedValue);

    if (
      fixedValue.length === getLengthCountry(country) &&
      getLengthCountry(country) !== 0
    ) {
      const transformedIBAN: string = moveToBack(fixedValue);
      const onlyNumbersIban: string = parseIBAN(transformedIBAN);
      valid = isValidIBAN(onlyNumbersIban);
    }
  }

  const result: FieldValidationResult = new FieldValidationResult();

  result.type = VALIDATION_TYPE;
  result.succeeded = valid;
  result.errorMessage = valid ? '' : defaultInvalidMessage;

  return result;
};
