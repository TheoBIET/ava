import { IpcMainEvent, app } from 'electron';
import { IpcRequest } from "../../shared/interfaces/IpcRequest";
import { Version } from "../../shared/interfaces/Version";
import { IpcResponseService } from "../services/IpcResponse";
import { IpcRequestService } from "../services/IpcRequest";

export class VersionChannel extends IpcRequestService {
  getName(): string {
    return 'version';
  }

  async execute(event: IpcMainEvent, _request: IpcRequest, channel: string): Promise<void> {
    IpcResponseService.send(event, channel, {
      version: app.getVersion(),
      isDev: process.env['VITE_DEV_SERVER_URL'] ? true : false
    } as Version)
  }
}