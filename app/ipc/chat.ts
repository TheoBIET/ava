import { IpcChannelInterface } from "../../shared/interfaces/IpcChannel";
import { IpcRequest } from "../../shared/interfaces/IpcRequest";
import { IpcMainEvent } from 'electron';
import { OllamaRequester, Message } from "../services/OllamaRequester";

interface ChatChannelRequest extends IpcRequest {
  args: {
    messages: Message[];
  }
}

export class ChatChannel implements IpcChannelInterface {
  getName(): string {
    return 'chat';
  }

  async handle(event: IpcMainEvent, request: ChatChannelRequest): Promise<void> {
    if (!request.responseChannel) request.responseChannel = `${this.getName()}_response`;
    try {
      const chatbot = new OllamaRequester({
        apiURL: 'http://127.0.0.1:11434',
        model: 'mistral',
      });

      const response = await chatbot.chat(request.args.messages) as { data: { message: Message } };
      event.sender.send(request.responseChannel, response.data.message);
    } catch (error) {
      event.sender.send(request.responseChannel, {
        error: true,
        message: 'Error in chatbot request.'
      });
    }
  }
}