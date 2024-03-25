import os from 'node:os';
import { IpcMainEvent } from 'electron';
import { IpcRequest } from "../../shared/interfaces/IpcRequest";
import { System } from "../../shared/interfaces/System";
import { IpcResponseService } from "../services/IpcResponse";
import { IpcRequestService } from "../services/IpcRequest";

export class SystemChannel extends IpcRequestService {
  getName(): string {
    return 'system';
  }

  async execute(event: IpcMainEvent, _request: IpcRequest, channel: string): Promise<void> {
    IpcResponseService.send(event, channel, {
      platform: process.platform,
      arch: `${os.type()} ${os.arch()}`,
      cpus: os.cpus()[0].model,
      memory: (os.totalmem() / 1024 / 1024 / 1024).toFixed(2),
    } as System);
  }
}