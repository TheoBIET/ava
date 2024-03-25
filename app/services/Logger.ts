export enum LogLevel {
  Error = "error",
  Warn = "warn",
  Info = "info",
  Debug = "debug"
}

export class Logger {
  colors: { [key: string]: string };
  args: { [key: string]: unknown };

  constructor() {
    this.args = {};
    this.colors = {
      error: '\x1b[31m',
      warn: '\x1b[33m',
      info: '\x1b[32m',
      debug: '\x1b[34m',
      reset: '\x1b[0m'
    };

    this.info({ message: 'Logger initialized' });
  }

  private log(level: LogLevel = LogLevel.Debug) {
    const timestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const color = this.colors[level];
    const data = { timestamp, level, status: 'OK', ...this.args };
    console.log(`${color}${JSON.stringify(data)}${this.colors.reset}`);
  }

  error(args: { [key: string]: unknown }) {
    const errorLine = new Error().stack?.split('\n')[2].trim();
    this.args = { ...args, stack: errorLine, status: 'KO' };
    this.log(LogLevel.Error);
  }

  warn(args: { [key: string]: unknown }) {
    this.args = args;
    this.log(LogLevel.Warn);
  }

  info(args: { [key: string]: unknown }) {
    this.args = args;
    this.log(LogLevel.Info);
  }

  debug(args: { [key: string]: unknown }) {
    this.args = args;
    this.log(LogLevel.Debug);
  }
}

export const logger = new Logger();