import Validations from "@/services/Validations";

export default class SignupValidations {
  constructor(email, password, organizationName) {
    this.email = email;
    this.password = password;
    this.organizationName = organizationName;
  }

  checkValidations() {
    let errors = [];

    if (!Validations.checkEmail(this.email)) {
      errors['email'] = 'Invalid Email';
    }

    if (Validations.minLength(this.password, 8)) {
      errors['password'] = 'Password length should equals or greater than 8';
    }

    if (Validations.minLength(this.organizationName, 6)) {
      errors['organizationName'] = 'Organization name should be equals or greater than 6';
    }

    return errors;
  }
}