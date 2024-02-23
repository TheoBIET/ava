import { IpcChannelInterface } from "../../shared/interfaces/IpcChannel";
import { IpcRequest } from "../../shared/interfaces/IpcRequest";
import { Model } from "../../shared/constants/models";

import { IpcMainEvent } from 'electron';
import { OllamaRequester, Message } from "../services/OllamaRequester";
import { IpcResponseService } from "../services/IpcResponse";

interface RequestOpts extends IpcRequest {
  args: {
    messages: Message[];
    apiUrl: string;
    model: Model;
  }
}

export class ChatChannel implements IpcChannelInterface {
  getName(): string {
    return 'chat';
  }

  async handle(event: IpcMainEvent, request: RequestOpts): Promise<void> {
    if (!request.responseChannel) request.responseChannel = `${this.getName()}_response`;
    try {
      const { messages, apiUrl, model } = request.args;
      const chatbot = new OllamaRequester({ apiUrl, model: model.name });
      const response = await chatbot.chat(messages);
      IpcResponseService.send(event, request.responseChannel, response);
    } catch (error) {
      IpcResponseService.send(event, request.responseChannel, {}, {
        status: 'KO',
        message: 'Error in chatbot request.',
      });
    }
  }
}