import { IpcChannelInterface } from "../../shared/interfaces/IpcChannel";
import { IpcRequest } from "../../shared/interfaces/IpcRequest";
import { System } from "../../shared/interfaces/System";
import { IpcMainEvent } from 'electron';
import os from 'node:os';

export class SystemChannel implements IpcChannelInterface {
  getName(): string {
    return 'system';
  }

  async handle(event: IpcMainEvent, request: IpcRequest): Promise<void> {
    if(!request.responseChannel) request.responseChannel = `${this.getName()}_response`;
    event.sender.send(request.responseChannel, {
      arch: `${os.type()} ${os.arch()}`,
      cpus: os.cpus()[0].model,
      memory: (os.totalmem() / 1024 / 1024 / 1024).toFixed(2),
    } as System);
  }
}