import Validateuser from "../authValidation";

const { signInDataValidation } = Validateuser;

describe("Sign In Validations", () => {
  test("should return an error when invalid data is sent", () => {
    const invalidData = {
      username: "?",
      password: ""
    };
    const result = signInDataValidation(invalidData);
    expect(result.hasErrors).toEqual(true);
    expect(result.errors.username).toHaveLength(2);
    expect(result.errors.password).toHaveLength(1);
  });

  test("should not return an error when valid data is sent", () => {
    const validData = {
      username: "johnny76",
      password: "password"
    };
    const result = signInDataValidation(validData);
    expect(result.hasErrors).toEqual(false);
    expect(result.errors).toEqual({});
  });
});
