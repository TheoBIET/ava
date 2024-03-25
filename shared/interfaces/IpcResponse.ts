export interface IpcResponseData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface IpcResponseError {
  status: 'OK' | 'KO';
  message?: string;
}

export interface IpcResponse {
  data: IpcResponseData;
  error: IpcResponseError;
}