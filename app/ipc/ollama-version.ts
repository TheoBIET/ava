import { IpcMainEvent } from 'electron';
import { IpcRequest } from "../../shared/interfaces/IpcRequest";
import { OllamaRequestError } from '../../shared/errors/OllamaRequest';
import { OllamaRequester } from "../services/OllamaRequester";
import { IpcResponseService } from "../services/IpcResponse";
import { IpcRequestService } from "../services/IpcRequest";
import { logger } from '../services/Logger';

interface RequestOpts extends IpcRequest {
  args: {
    apiUrl: string;
  }
}

export class OllamaVersionChannel extends IpcRequestService {
  getName(): string {
    return 'ollama-version';
  }

  async execute(event: IpcMainEvent, request: RequestOpts, channel: string): Promise<void> {
    try {
      const { apiUrl } = request.args;
      const ollamaApi = new OllamaRequester({ apiUrl });
      const response = await ollamaApi.test();
      IpcResponseService.send(event, channel, response.data);
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof OllamaRequestError) message = error.message;
      logger.error({ message });
      IpcResponseService.send(event, channel, {}, {
        status: 'KO',
        message,
      });
    }
  }
}