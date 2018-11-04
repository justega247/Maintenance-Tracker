import ValidateRequests from '../requestValidation';

const { requestDataValidation } = ValidateRequests;

describe('Requests validations', () => {
  test('should return an error when invalid data is sent', () => {
    const invalidData = {
      title: '',
      description: '',
    };
    const result = requestDataValidation(invalidData);
    expect(result.hasErrors).toEqual(true);
  });

  test('should not return an error when valid data is sent', () => {
    const validData = {
      title: 'johnny is at it again',
      description: 'This is beautiful work',
    };
    const result = requestDataValidation(validData);
    expect(result.hasErrors).toEqual(false);
    expect(result.errors).toEqual({});
  });
});
