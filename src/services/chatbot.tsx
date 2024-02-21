import { Ollama, Message } from 'ollama';

export default class ChatbotService {
  model: string;
  #ollama;

  constructor(model: string | undefined = 'mistral') {
    this.model = model;
    this.#ollama = new Ollama({
      host: 'http://localhost:11434',
    });
  }

  async chat(messages: Message[]) {
    return this.#ollama.chat({
      model: this.model,
      messages,
    })
  }
}