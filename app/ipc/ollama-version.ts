import { IpcChannelInterface } from "../../shared/interfaces/IpcChannel";
import { IpcRequest } from "../../shared/interfaces/IpcRequest";
import { IpcMainEvent } from 'electron';
import { OllamaRequester } from "../services/OllamaRequester";

export class OllamaVersionChannel implements IpcChannelInterface {
  getName(): string {
    return 'ollama-version';
  }

  async handle(event: IpcMainEvent, request: IpcRequest): Promise<void> {
    if (!request.responseChannel) request.responseChannel = `${this.getName()}_response`;
    try {
      const chatbot = new OllamaRequester({
        apiURL: 'http://127.0.0.1:11434',
      });

      const response = await chatbot.test();
      event.sender.send(request.responseChannel, response.data.version);
    } catch (error) {
      event.sender.send(request.responseChannel, {
        error: true,
        message: 'Error during request Ollama API, please be sure that the server is running',
      });
    }
  }
}