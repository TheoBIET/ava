import { IpcChannelInterface } from "../interfaces/IpcChannel";
import { IpcRequest } from "../interfaces/IpcRequest";
import { IpcMainEvent } from 'electron';
import os from 'node:os';

export class SystemChannel implements IpcChannelInterface {
  getName(): string {
    return 'system';
  }

  async handle(event: IpcMainEvent, request: IpcRequest): Promise<void> {
    if(!request.channel) request.channel = `${this.getName()}_response`;
    event.sender.send(request.channel, {
      version: os.version(),
      arch: os.arch(),
      type: os.type(),
      cpus: os.cpus(),
      memory: (os.totalmem() / 1024 / 1024 / 1024).toFixed(2),
    });
  }
}