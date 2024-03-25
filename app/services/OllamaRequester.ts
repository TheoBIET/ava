import axios, { AxiosInstance } from 'axios';
import { OllamaRequestError } from "../../shared/errors/OllamaRequest";

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

  set opts(opts: OllamaRequesterConfig) {
    this.#opts = opts;
  }

  async test(): Promise<{ data: { version: string } }> {
    try {
      return await this.#api.get('/api/version');
    } catch (error) {
      throw new OllamaRequestError();
    }
  }

  async chat(messages: Message[]): Promise<{ data: { message: Message } }> {
    try {
      return await this.#api.post('/api/chat', {
        model: this.#opts.model || 'mistral',
        stream: !!this.#opts.stream,
        messages,
      });
    } catch (error) {
      throw new OllamaRequestError();
    }
  }
}