declare interface Electron {
  send: (channel: string, ...args: unknown[]) => void;
  sendSync: (channel: string, ...args: unknown[]) => void;
  on: (channel: string, listener: (event: Electron.IpcRendererEvent, ...args: unknown[]) => void) => void;
}

declare interface Window {
  electron?: Electron;
}
