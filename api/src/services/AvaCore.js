const childProcess = require('child_process');

class AvaCore {
  constructor() {
    this._process = childProcess;

    this._process.on('error', (err) => {
      console.log(err);
    });
  }

  async exec(command) {
    return new Promise((resolve, reject) => {
      this._process.exec(command, (err, stdout, stderr) => {
        if (err) {
          reject(err);
        }

        resolve(stdout);
      });
    });
  }
}

module.exports = AvaCore;