import EventManager from "lib/eventManager";

export const toastEventManager = new EventManager();

export const toast = {
  error: (message: string, duration?: number) => {
    toastEventManager.emit("addtoast", { type: "error", message, duration });
  },
  success: (message: string, duration?: number) => {
    toastEventManager.emit("addtoast", { type: "success", message, duration });
  },
  default: (message: string, duration?: number) => {
    toastEventManager.emit("default", { type: "success", message, duration });
  },
};
