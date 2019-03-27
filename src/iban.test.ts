import { VALIDATION_TYPE, validateIBAN } from './iban';
import { FieldValidationResult } from 'lc-form-validation';

describe('validateIBAN', () => {
  it('Should invalidate undefined input', () => {
    // Arrange
    const testIBAN = undefined;
    // Act
    const result = validateIBAN(testIBAN) as FieldValidationResult;
    // Assert
    expect(result.succeeded).toBeFalsy();
  });

  it('Should return type IBAN', () => {
    // Arrange
    const testIBAN = undefined;
    // Act
    const result = validateIBAN(testIBAN) as FieldValidationResult;
    // Assert
    expect(result.type).toEqual(VALIDATION_TYPE);
    expect(result.succeeded).toBeFalsy();
  });

  it('Should invalidate null input', () => {
    // Arrange
    const testIBAN = null;
    // Act
    const result = validateIBAN(testIBAN) as FieldValidationResult;
    // Assert
    expect(result.succeeded).toBeFalsy();
  });

  it('Should invalidate non-string input', () => {
    // Arrange
    const testIBAN = 123456789;
    // Act
    const result = validateIBAN(testIBAN) as FieldValidationResult;
    // Assert
    expect(result.succeeded).toBeFalsy();
  });

  it('Should invalidate empty string', () => {
    // Arrange
    const testIBAN = '';
    // Act
    const result = validateIBAN(testIBAN) as FieldValidationResult;
    // Assert
    expect(result.succeeded).toBeFalsy();
  });
  it('Should invalidate a malformed IBAN', () => {
    // Arrange
    const testIBAN = '*/82 1233456';
    // Act
    const result = validateIBAN(testIBAN) as FieldValidationResult;
    // Assert
    expect(result.succeeded).toBeFalsy();
  });
  it('Should invalidate an invalid IBAN', () => {
    // Arrange
    const testIBAN = 'GB82 WEST 1234 5698 7654 31';
    // Act
    const result = validateIBAN(testIBAN) as FieldValidationResult;
    // Assert
    expect(result.succeeded).toBeFalsy();
  });
  it('Should invalidate an invalid IBAN with lowerCase', () => {
    // Arrange
    const testIBAN = 'gb82 west 1234 5698 7654 31';
    // Act
    const result = validateIBAN(testIBAN) as FieldValidationResult;
    // Assert
    expect(result.succeeded).toBeFalsy();
  });
  it('Should validate a valid IBAN', () => {
    // Arrange
    const testIBAN = 'GB82 WEST 1234 5698 7654 32';
    // Act
    const result = validateIBAN(testIBAN) as FieldValidationResult;
    // Assert
    expect(result.succeeded).toBeTruthy();
  });
  it('Should validate a valid IBAN with lowerCase', () => {
    // Arrange
    const testIBAN = 'gb82 west 1234 5698 7654 32';
    // Act
    const result = validateIBAN(testIBAN) as FieldValidationResult;
    // Assert
    expect(result.succeeded).toBeTruthy();
  });

  it('Should validate length for diferent countries', () => {
    // Arrange
    const GtTestIBAN = 'gb82 west 1234 5698 7654 32'; // 22
    const ItTestIBAN = 'IT78 Y084 3477 3400 0000 0027 424'; // 27
    // Act
    const GbResult = validateIBAN(GtTestIBAN) as FieldValidationResult;
    const ItResult = validateIBAN(ItTestIBAN) as FieldValidationResult;
    // Assert
    expect(GbResult.succeeded).toBeTruthy();
    expect(ItResult.succeeded).toBeTruthy();
  });

  it('Should invalidate inappropriate length for countries', () => {
    // Arrange
    const testIBAN = 'gb82 west 1234 5698';
    // Act
    const result = validateIBAN(testIBAN) as FieldValidationResult;

    // Assert
    expect(result.succeeded).toBeFalsy();
  });

  it('Should validate with and without blankspaces', () => {
    // Arrange
    const testIBAN = 'gb82 west 1234 5698 7654 32';
    const noSpacesTestIBAN = 'gb82west12345698765432';
    // Act
    const result = validateIBAN(testIBAN) as FieldValidationResult;
    const resultNoSpaces = validateIBAN(noSpacesTestIBAN) as FieldValidationResult;
    // Assert
    expect(result.succeeded).toBeTruthy();
    expect(resultNoSpaces.succeeded).toBeTruthy();
  });
});
