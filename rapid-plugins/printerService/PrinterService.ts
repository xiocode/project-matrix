import {v4 as uuidv4} from 'uuid';
import type { IRpdServer } from "@ruiapp/rapid-core";
import { PrintTaskState, PrinterNetworkState, type CreatePrintTasksInput, type GetNextPendingPrintTaskInput, type PrintTask, type PrinterStatusInfo, type RegisterPrinterInput, type UpdatePrintTaskStateInput, type UpdatePrinterStateInput } from "./PrinterPluginTypes";
import type { SaveSvcPrinterInput, SvcPrinter } from "~/_definitions/meta/entity-types";
import { find, findIndex, first } from "lodash";

const offlineSeconds = 180;
const OFFLINE_MS = offlineSeconds * 1000;

export default class PrinterService {
  #server: IRpdServer;
  #printers: PrinterStatusInfo[];
  #tasksOfPrinters: Map<string, PrintTask[]>;

  constructor(server: IRpdServer) {
    this.#server = server;
    this.#printers = [];
    this.#tasksOfPrinters = new Map();
  }

  #printerBeat(code: string, state: PrinterNetworkState) {
    let printer: PrinterStatusInfo | undefined = find(this.#printers, {code});
    if (!printer) {
      printer = {
        code,
        state: state,
        latestBeat: new Date(),
      };
      this.#printers.push(printer);
    } else {
      printer.state = state;
      printer.latestBeat = new Date();
    }
  }

  async registerPrinter(input: RegisterPrinterInput) {
    const printerManager = this.#server.getEntityManager<SvcPrinter>("svc_printer");
  
    const printer = await printerManager.findEntity({
      filters: [
        { operator: "eq", field: "code", value: input.code },
      ],
    });

    if (!printer) {
      await printerManager.createEntity({
        entity: {
          code: input.code,
          orderNum: 0,
          networkState: PrinterNetworkState.Online,
        } satisfies SaveSvcPrinterInput,
      });
    } else {
      await printerManager.updateEntityById({
        id: printer.id,
        entityToSave: {
          networkState: PrinterNetworkState.Online,
        } satisfies Partial<SaveSvcPrinterInput>,
      });
    }

    this.#printerBeat(input.code, PrinterNetworkState.Online);
  }

  async updatePrinterState(input: UpdatePrinterStateInput) {
    const printerManager = this.#server.getEntityManager<SvcPrinter>("svc_printer");
  
    const printer = await printerManager.findEntity({
      filters: [
        { operator: "eq", field: "code", value: input.code },
      ],
    });
  
    if (!printer) {
      throw new Error(`Print '${input.code}' was not found.`)
    }

    await printerManager.updateEntityById({
      id: printer.id,
      entityToSave: {
        networkState: input.state,
      } satisfies Partial<SaveSvcPrinterInput>,
    });

    this.#printerBeat(input.code, input.state);
  }

  async createPrintTasks(input: CreatePrintTasksInput) {
    const { code } = input;

    const printerManager = this.#server.getEntityManager<SvcPrinter>("svc_printer");

    const printer = await printerManager.findEntity({
      filters: [
        { operator: "eq", field: "code", value: input.code },
      ],
    });

    if (!printer) {
      throw new Error(`Print '${input.code}' was not found.`)
    }

    if (printer.networkState !== "1") {
      throw new Error(`Printer '${input.code}' is offline.`)
    }

    const tasksToCreate = input.tasks;
    for (const task of tasksToCreate) {
      task.id = uuidv4();
      task.state = PrintTaskState.Pending;
      if (!task.type) {
        task.type = "zpl-label";
      }
      if (!task.name) {
        task.name = "label";
      }
    }

    let tasksOfPrinters = this.#tasksOfPrinters.get(code);
    if (!tasksOfPrinters) {
      tasksOfPrinters = [];
      this.#tasksOfPrinters.set(code, tasksOfPrinters);
    }

    tasksOfPrinters.push(...tasksToCreate);
  }

  async getNextPendingPrintTask(input: GetNextPendingPrintTaskInput) {
    const { code } = input;
    let printer = find(this.#printers, { code });
    if (!printer) {
      throw new Error(`Print '${input.code}' was not found.`)
    }

    printer.state = PrinterNetworkState.Online;
    printer.latestBeat = new Date();

    const printTask = first(this.#tasksOfPrinters.get(code) || []);
    return printTask;
  }

  async updatePrintTaskState(input: UpdatePrintTaskStateInput) {
    const { code, taskId, state } = input;
    let printer = find(this.#printers, { code });
    if (!printer) {
      throw new Error(`Print '${input.code}' was not found.`)
    }

    let tasks = this.#tasksOfPrinters.get(code) || [];
    let taskIndex = findIndex(tasks, {id: taskId});
    if (taskIndex === -1) {
      return;
    }

    if (state !== PrintTaskState.Pending) {
      tasks.splice(taskIndex, 1);
    }
  }

  async detectOfflinePrinters() {
    const now = new Date();
    for (const printer of this.#printers) {
      if (printer.state === PrinterNetworkState.Offline) {
        continue;
      }

      if ((now as any) - (printer.latestBeat as any) > OFFLINE_MS) {
        printer.state = PrinterNetworkState.Offline;
        await this.updatePrinterState({
          code: printer.code,
          state: printer.state,
        });
      }
    }
  }
}
