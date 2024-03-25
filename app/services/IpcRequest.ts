import { logger } from "./Logger";
import { IpcMainEvent } from 'electron';
import { IpcChannelInterface } from "../../shared/interfaces/IpcChannel";
import { IpcRequest } from "../../shared/interfaces/IpcRequest";
import { MethodNotImplementedError } from "../../shared/errors/MethodNotImplemented";

interface RequestOpts extends IpcRequest {
  args: { [key: string]: unknown };
}

export class IpcRequestService implements IpcChannelInterface {
  getName(): string {
    return 'unknown';
  }

  getResponseChannel(request: IpcRequest): string {
    return request.responseChannel || `${this.getName()}_response`;
  }

  async handle(event: IpcMainEvent, request: RequestOpts): Promise<void> {
    logger.info({ message: `Received request: ${this.getName()}` });
    this.execute(event, request, this.getResponseChannel(request));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(_event: IpcMainEvent, _request: IpcRequest, _channel: string): Promise<void> {
    try {
      throw new MethodNotImplementedError();
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof MethodNotImplementedError) message = error.message;
      logger.error({ message });
    }
  }
}