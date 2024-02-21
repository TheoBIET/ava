import { IpcRenderer } from "electron";
import { IpcRequest } from "../../shared/interfaces/IpcRequest";

export class IpcService {
  private ipcRenderer: IpcRenderer | null = null;

  public send<T>(channel: string, request: IpcRequest = { responseChannel: '', args: {}}): Promise<T> {
    if (!this.ipcRenderer) this.init();
    if (!request.responseChannel) request.responseChannel = `${channel}_response_${new Date().getTime()}`;

    const ipcRenderer = this.ipcRenderer;
    ipcRenderer?.send(channel, request);

    return new Promise(resolve => {
      ipcRenderer?.once(request.responseChannel as string, (_, response) => resolve(response));
    });
  }

  private init() {
    if (!window || !window.ipcRenderer) {
      throw new Error('Unable to require renderer process');
    }

    this.ipcRenderer = window.ipcRenderer;
  }
}