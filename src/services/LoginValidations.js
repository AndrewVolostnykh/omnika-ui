export default class LoginValidations {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  checkOnLogin() {
    let errors = [];

    if (!this.email) {
      errors['email'] = 'Please, enter email';
    }

    if (!this.password) {
      errors['password'] = 'Please, enter password';
    }

    return errors;
  }
}