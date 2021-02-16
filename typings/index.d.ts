declare interface Window {
  ipcRenderer: Electron.IpcRenderer;
}

declare interface IResponse {
  success: boolean;
  code: string;
  message: string;
  [propName: string]: any;
}
