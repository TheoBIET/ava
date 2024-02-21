import { IpcChannelInterface } from "../../shared/interfaces/IpcChannel";
import { IpcRequest } from "../../shared/interfaces/IpcRequest";
import { Version } from "../../shared/interfaces/Version";
import { IpcMainEvent, app } from 'electron';

export class VersionChannel implements IpcChannelInterface {
  getName(): string {
    return 'version';
  }

  async handle(event: IpcMainEvent, request: IpcRequest): Promise<void> {
    if(!request.responseChannel) request.responseChannel = `${this.getName()}_response`;
    event.sender.send(request.responseChannel, {
      version: app.getVersion(),
    } as Version);
  }
}