import { IpcRequest } from "../../shared/interfaces/IpcRequest";
import { Model } from "../../shared/constants/models";

import { IpcMainEvent } from 'electron';
import { OllamaRequester, Message } from "../services/OllamaRequester";
import { IpcResponseService } from "../services/IpcResponse";
import { IpcRequestService } from "../services/IpcRequest";
import { OllamaRequestError } from "../../shared/errors/OllamaRequest";
import { logger } from "../services/Logger";

interface RequestOpts extends IpcRequest {
  args: {
    messages: Message[];
    apiUrl: string;
    model: Model;
  }
}

export class ChatChannel extends IpcRequestService {
  getName(): string {
    return 'chat';
  }

  async execute(event: IpcMainEvent, request: RequestOpts, channel: string): Promise<void> {
    try {
      const { messages, apiUrl, model } = request.args;
      const chatbot = new OllamaRequester({ apiUrl, model: model.name });
      const response = await chatbot.chat(messages);
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