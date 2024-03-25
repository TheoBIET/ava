import { ErrorInterface } from '../interfaces/Error';

export class MethodNotImplementedError extends Error implements ErrorInterface {
  name: string;
  message: string;

  constructor() {
    const message = 'The method must be implemented in the child class.';
    super(message);
    
    this.name = this.constructor.name;
    this.message = message;
  }
}