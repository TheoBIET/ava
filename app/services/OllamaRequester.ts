import axios, { AxiosInstance } from 'axios';

export interface Message {
  role: string
  content: string
  images?: Uint8Array[] | string[]
}

export interface OllamaRequesterConfig {
  apiURL?: string 
  model?: string 
  stream?: boolean
}

export class OllamaRequester {
  #opts: OllamaRequesterConfig;
  #api: AxiosInstance;

  constructor(opts: OllamaRequesterConfig) {
    this.#opts = opts;
    this.#api = axios.create({
      baseURL: opts.apiURL,
      proxy: false,
    });
  }

  async test() {
    return this.#api.get('/api/version');
  }

  async chat(messages: Message[]) {
    console.log('chat', messages);
    return this.#api.post('/api/chat', {
      model: this.#opts.model || 'mistral',
      stream: !!this.#opts.stream,
      messages,
    });
  }
}