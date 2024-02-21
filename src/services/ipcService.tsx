import { IpcRenderer } from "electron";
import { IpcRequest } from "../interfaces/IpcRequest";

export class IpcService {
  private ipcRenderer: IpcRenderer | null = null;

  public send<T>(channel: string, request: IpcRequest = { channel: '', params: []}): Promise<T> {
    if (!this.ipcRenderer) this.init();
    if (!request.channel) request.channel = `${channel}_response_${new Date().getTime()}`;

    const ipcRenderer = this.ipcRenderer;
    ipcRenderer?.send(channel, request);

    return new Promise(resolve => {
      ipcRenderer?.once(request.channel, (_, response) => resolve(response));
    });
  }

  private init() {
    console.log(window);
    if (!window || !window.ipcRenderer) {
      throw new Error('Unable to require renderer process');
    }

    this.ipcRenderer = window.ipcRenderer;
  }
}