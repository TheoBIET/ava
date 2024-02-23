import { IpcChannelInterface } from "../../shared/interfaces/IpcChannel";
import { IpcRequest } from "../../shared/interfaces/IpcRequest";

import { IpcMainEvent } from 'electron';
import { OllamaRequester } from "../services/OllamaRequester";
import { IpcResponseService } from "../services/IpcResponse";

interface RequestOpts extends IpcRequest {
  args: {
    apiUrl: string;
  }
}

export class OllamaVersionChannel implements IpcChannelInterface {
  getName(): string {
    return 'ollama-version';
  }

  async handle(event: IpcMainEvent, request: RequestOpts): Promise<void> {
    if (!request.responseChannel) request.responseChannel = `${this.getName()}_response`;
    try {
      const { apiUrl } = request.args;
      const ollamaApi = new OllamaRequester({ apiUrl });
      const response = await ollamaApi.test();
      IpcResponseService.send(event, request.responseChannel, response);
    } catch (error) {
      IpcResponseService.send(event, request.responseChannel, {}, {
        status: 'KO',
        message: 'Error during request Ollama API, please be sure that the server is running',
      });
    }
  }
}