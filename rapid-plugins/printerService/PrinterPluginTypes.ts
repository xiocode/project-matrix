export enum PrintTaskState {
  Pending = 0,
  Done = 1,
}

export enum PrinterNetworkState {
  Offline = "0",
  Online = "1",
}

export type PrintTask = {
  id: string;
  type: string;
  name: string;
  data: string;
  state?: PrintTaskState;
}

export type PrinterStatusInfo = {
  code: string;
  state: PrinterNetworkState;
  latestBeat: Date;
}

export type RegisterPrinterInput = {
  code: string;
}

export type UpdatePrinterStateInput = {
  code: string;
  state: PrinterNetworkState;
}

export type CreatePrintTasksInput = {
  code: string;
  tasks: PrintTask[];
}

export type GetNextPendingPrintTaskInput = {
  code: string;
}

export type UpdatePrintTaskStateInput = {
  code: string;
  taskId: string;
  state: PrintTaskState;
}