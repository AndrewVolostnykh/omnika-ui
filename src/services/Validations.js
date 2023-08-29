export default class Validations {
  static checkEmail(email) {
    if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    ) {
      return true;
    } else {
      return false;
    }
  }

  static minLength(value, minLength) {
    return value.length < minLength;
  }
}