import axios, { AxiosInstance } from 'axios';

export interface Message {
  role: string
  content: string
  images?: Uint8Array[] | string[]
}

export interface OllamaRequesterConfig {
  apiUrl?: string 
  model?: string 
  stream?: boolean
}

export class OllamaRequester {
  #opts: OllamaRequesterConfig;
  #api: AxiosInstance;

  constructor(opts: OllamaRequesterConfig) {
    this.#opts = opts;
    this.#api = axios.create({
      baseURL: opts.apiUrl,
      proxy: false,
    });
  }

  async test(): Promise<{ version: string }> {
    try {
      const response = await this.#api.get('/api/version');
      return response.data;
    } catch (error) {
      console.log(error)
      throw new Error();
    }
  }

  async chat(messages: Message[]): Promise<{ message: Message }> {
    try {
      const response = await this.#api.post('/api/chat', {
        model: this.#opts.model || 'mistral',
        stream: !!this.#opts.stream,
        messages,
      });

      return response.data;
    } catch (error) {
      throw new Error();
    }
  }
}