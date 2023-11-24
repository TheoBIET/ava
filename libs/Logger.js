class Logger {
  constructor() {
    this.logs = [];
  }

  log(message) {
    console.log(message);
  }
}

export default new Logger();