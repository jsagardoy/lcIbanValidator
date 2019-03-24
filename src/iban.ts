import {
  FieldValidationFunction,
  FieldValidationResult
} from "lc-form-validation";

const defaultInvalidMessage = "Invalid IBAN";

const ibanPattern = /^[a-zA-Z]{2}[a-zA-Z0-9]*$/;

const isString = (input: any) =>
  typeof input === "string" || input instanceof String;
const setupString = (input: string): string =>
  input.replace(/\s/g, "").toUpperCase(); //eliminate spaces and set all to Uppercase
const getCountry = (input: string) => input.substring(0, 2);
const isValidString = (input: any): boolean => ibanPattern.test(input);
const getLengthCountry = (input: string): number => {
  switch (input) {
    case "AL":
      return 28;
      break;
    case "DE":
      return 22;
      break;
    case "AD":
      return 24;
      break;
    case "SA":
      return 24;
      break;
    case "AT":
      return 20;
      break;
    case "AZ":
      return 28;
      break;
    case "BH":
      return 22;
      break;
    case "BY":
      return 28;
      break;
    case "BA":
      return 20;
      break;
    case "BR":
      return 29;
      break;
    case "BG":
      return 22;
      break;
    case "BE":
      return 16;
      break;
    case "CY":
      return 28;
      break;
    case "CR":
      return 22;
      break;
    case "HR":
      return 21;
      break;
    case "DK":
      return 18;
      break;
    case "SV":
      return 28;
      break;
    case "AE":
      return 23;
      break;
    case "SI":
      return 19;
      break;
    case "ES":
      return 24;
      break;
    case "EE":
      return 20;
      break;
    case "FI":
      return 18;
      break;
    case "FR":
      return 27;
      break;
    case "GE":
      return 22;
      break;
    case "GI":
      return 23;
      break;
    case "GR":
      return 27;
      break;
    case "GL":
      return 18;
      break;
    case "GT":
      return 28;
      break;
    case "NL":
      return 18;
      break;
    case "HU":
      return 28;
      break;
    case "IQ":
      return 23;
      break;
    case "IE":
      return 22;
      break;
    case "IS":
      return 26;
      break;
    case "FO":
      return 18;
      break;
    case "VG":
      return 24;
      break;
    case "IL":
      return 23;
      break;
    case "IT":
      return 27;
      break;
    case "JO":
      return 30;
      break;
    case "KZ":
      return 20;
      break;
    case "XK":
      return 20;
      break;
    case "KW":
      return 30;
      break;
    case "LV":
      return 21;
      break;
    case "LI":
      return 21;
      break;
    case "LT":
      return 20;
      break;
    case "LU":
      return 20;
      break;
    case "LB":
      return 28;
      break;
    case "MK":
      return 19;
      break;
    case "MT":
      return 31;
      break;
    case "MU":
      return 30;
      break;
    case "MR":
      return 27;
      break;
    case "MD":
      return 24;
      break;
    case "ME":
      return 22;
      break;
    case "MC":
      return 27;
      break;
    case "NO":
      return 15;
      break;
    case "PK":
      return 24;
      break;
    case "PS":
      return 29;
      break;
    case "PL":
      return 28;
      break;
    case "PT":
      return 25;
      break;
    case "QA":
      return 29;
      break;
    case "GB":
      return 22;
      break;
    case "CZ":
      return 24;
      break;
    case "DO":
      return 28;
      break;
    case "RO":
      return 24;
      break;
    case "SM":
      return 27;
      break;
    case "LC":
      return 32;
      break;
    case "ST":
      return 25;
      break;
    case "RS":
      return 22;
      break;
    case "SC":
      return 31;
      break;
    case "SK":
      return 24;
      break;
    case "SE":
      return 24;
      break;
    case "CH":
      return 21;
      break;
    case "TL":
      return 23;
      break;
    case "TR":
      return 26;
      break;
    case "TN":
      return 24;
      break;
    case "UA":
      return 29;
      break;
    default:
      return 0;
  }
};
const moveToBack = (input: string): string =>
  input.substring(4, input.length) + input.substring(0, 4);

const transformLetterToNumber = (input: string): string => {
  return (input.charCodeAt(0) - 55).toString();
};

const parseIBAN = (input: string): string => {
  let result: string = "";
  for (let i: number = 0; i < input.length; i++) {
    /\d/.test(input[i])
      ? (result = result + input[i])
      : (result = result + transformLetterToNumber(input[i]));
  }

  return result;
};

const checkNumber = (input: string): number => {
  let value: string = input;
  while (value.length >= 9) {
    let partial: string = value.substring(0, 9);
    let rest: string = value.substring(9);
    let num: number = +partial % 97;
    value = num.toString() + rest;
  }
  return +value % 97;
};

const isValidIBAN = (input: string): boolean => {
  const result: number = checkNumber(input);

  if (result === 1) {
    return true;
  } else {
    return false;
  }
};

export const VALIDATION_TYPE = "IBAN";

export const validateIBAN:FieldValidationFunction = (value: any): FieldValidationResult => {
  /*
Check that the total IBAN length is correct as per the country. If not, the IBAN is invalid
Move the four initial characters to the end of the string
Replace each letter in the string with two digits, thereby expanding the string, where A = 10, B = 11, ..., Z = 35
Interpret the string as a decimal integer and compute the remainder of that number on division by 97
If the remainder is 1, the check digit test is passed and the IBAN might be valid.
*/

  let valid: boolean = false;

  if (isString(value) && isValidString) {
    let fixedValue: string = setupString(value);
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
  result.errorMessage = valid ? "" : defaultInvalidMessage;

  return result;
};
