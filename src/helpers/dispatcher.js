export class Dispatcher {
  #handlers = [];
  #subscribers = new Map();

  afterEveryCommand(handler) {
    this.#handlers.push(handler);

    return () => {
      const idx = this.#handlers.indexOf(handler);
      this.#handlers.splice(idx, 1);
    };
  }

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
