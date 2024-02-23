import { IpcChannelInterface } from "../../shared/interfaces/IpcChannel";
import { IpcRequest } from "../../shared/interfaces/IpcRequest";
import { System } from "../../shared/interfaces/System";

import os from 'node:os';
import { IpcMainEvent } from 'electron';
import { IpcResponseService } from "../services/IpcResponse";

export class SystemChannel implements IpcChannelInterface {
  getName(): string {
    return 'system';
  }

  async handle(event: IpcMainEvent, request: IpcRequest): Promise<void> {
    if(!request.responseChannel) request.responseChannel = `${this.getName()}_response`;
    IpcResponseService.send(event, request.responseChannel, {
      platform: process.platform,
      arch: `${os.type()} ${os.arch()}`,
      cpus: os.cpus()[0].model,
      memory: (os.totalmem() / 1024 / 1024 / 1024).toFixed(2),
    } as System);
  }
}