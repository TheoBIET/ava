/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IpcRequest {
  responseChannel?: string;
  args: any;
}