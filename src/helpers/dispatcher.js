export class Dispatcher {
  #subscribers = new Map();

  subscribe(command, handler) {
    if (!this.#subscribers.has(command)) {
      this.#subscribers.set(command, []);
    }

    const handlers = this.#subscribers.get(command);
    if (handlers.includes(handler)) {
      return () => {};
    }

    handlers.push(handler);

    return () => {
      const idx = handlers.indexOf(handler);
      handlers.splice(idx, 1);
    };
  }
}
