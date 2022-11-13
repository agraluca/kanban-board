type TToastPayload = {
  type: string;
  message: string;
  duration?: number;
};

export default class EventManager {
  listeners: Map<string, any>;
  constructor() {
    this.listeners = new Map();
  }
  on(event: string, listener: any) {
    console.log(listener);
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(listener);
  }
  emit(event: string, payload: TToastPayload) {
    const listeners = this.listeners.get(event);
    if (!listeners) return;
    listeners.forEach((listener: any) => {
      listener(payload);
    });
  }
  removeListener(event: string, listenerToRemove: (event: any) => void) {
    const listeners = this.listeners.get(event);
    if (!listeners) return;
    const filteredListeners = listeners.filter(
      (listener: any) => listener !== listenerToRemove
    );
    this.listeners.set(event, filteredListeners);
  }
}
