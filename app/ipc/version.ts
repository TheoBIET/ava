import { IpcChannelInterface } from "../interfaces/IpcChannel";
import { IpcRequest } from "../interfaces/IpcRequest";
import { IpcMainEvent, app } from 'electron';

export class VersionChannel implements IpcChannelInterface {
  getName(): string {
    return 'version';
  }

  async handle(event: IpcMainEvent, request: IpcRequest): Promise<void> {
    if(!request.channel) request.channel = `${this.getName()}_response`;
    event.sender.send(request.channel, {
      version: app.getVersion(),
    });
  }
}