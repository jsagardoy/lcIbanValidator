/**
 * Validates an input value as IBAN (International Bank Account Number)
 * @param value Input value to be interpreted as IBAN
 */

import FieldValidationResult from 'lc-form-validation';
export declare const VALIDATION_TYPE : string;
export declare function validateIBAN(value: any) : FieldValidationResult;