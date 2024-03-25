import { ErrorInterface } from '../interfaces/Error';

export class OllamaRequestError extends Error implements ErrorInterface {
  name: string;
  message: string;

  constructor() {
    const message = 'An error occurred during the request to the Ollama API, please be sure that the server is running';
    super(message);
    
    this.name = this.constructor.name;
    this.message = message;
  }
}