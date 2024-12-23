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

  dispatch(command, payload) {
    if (this.#subscribers.has(command)) {
      this.#subscribers.get(command).forEach((handler) => handler(payload));
    } else {
      console.error(`No handlers for command: ${command}`);
    }

    this.#handlers.forEach((handler) => handler());
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
