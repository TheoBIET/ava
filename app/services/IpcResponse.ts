import { IpcResponse, IpcResponseData, IpcResponseError } from "../../shared/interfaces/IpcResponse";
import { IpcMainEvent } from 'electron';
import { logger } from "./Logger";

export class IpcResponseService {
  public static send(event: IpcMainEvent, channel: string, data: IpcResponseData, error?: IpcResponseError): void {
    event.sender.send(channel, {
      data,
      error: error || { status: 'OK' },
    } as IpcResponse);

    logger.info({
      message: `Sending response to channel: ${channel}`,
      data,
    });
  }
}