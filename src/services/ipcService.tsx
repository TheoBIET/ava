import { IpcRenderer } from "electron";
import { IpcRequest } from "../../shared/interfaces/IpcRequest";
import { IpcResponse } from "../../shared/interfaces/IpcResponse";

export class IpcService {
  private ipcRenderer: IpcRenderer | null = null;

  public send(channel: string, args = {}): Promise<IpcResponse> {
    if (!this.ipcRenderer) this.init();
    const request: IpcRequest = { 
      responseChannel: `${channel}_response_${new Date().getTime()}`,
      args
    }
    
    const ipcRenderer = this.ipcRenderer;
    ipcRenderer?.send(channel, request);

    return new Promise(resolve => {
      ipcRenderer?.once(request.responseChannel as string, (_, response) => resolve(response as IpcResponse));
    });
  }

  private init() {
    if (!window || !window.ipcRenderer) {
      throw new Error('Unable to require renderer process');
    }

    this.ipcRenderer = window.ipcRenderer;
  }
}

export default new IpcService();