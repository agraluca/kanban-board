import { TToastEvent } from "components/Toast";

export default class EventManager {
  listeners: Map<string, ((event: TToastEvent) => void)[]>;
  constructor() {
    this.listeners = new Map();
  }
  on(event: string, listener: (event: TToastEvent) => void) {
    console.log(this.listeners.get(event));
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners?.get(event)?.push(listener);
  }
  emit(event: string, payload: TToastEvent) {
    const listeners = this.listeners.get(event);
    if (!listeners) return;
    listeners.forEach((listener: (payload: TToastEvent) => void) => {
      listener(payload);
    });
  }
  removeListener(
    event: string,
    listenerToRemove: (event: TToastEvent) => void
  ) {
    const listeners = this.listeners.get(event);
    if (!listeners) return;
    const filteredListeners = listeners.filter(
      (listener) => listener !== listenerToRemove
    );
    this.listeners.set(event, filteredListeners);
  }
}
