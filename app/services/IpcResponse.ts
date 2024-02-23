import { IpcResponse, IpcResponseData, IpcResponseError } from "../../shared/interfaces/IpcResponse";
import { IpcMainEvent } from 'electron';

export class IpcResponseService {
  public static send(event: IpcMainEvent, channel: string, data: IpcResponseData, error?: IpcResponseError): void {
    event.sender.send(channel, {
      data,
      error: error || { status: 'OK' },
    } as IpcResponse);
  }
}