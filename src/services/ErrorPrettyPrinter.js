export default class ErrorPrettyPrinter {
  constructor(code) {
    this.code = code;
  }

  // TODO: need to write more valid logic to print errors
  // like: if code === 'FORBIDDEN' then return 'You have no access to it'
  print() {
    return this.code;
  }
}