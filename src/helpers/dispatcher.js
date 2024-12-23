export class Dispatcher {
  //private props
  #handlers = [];
  #subscriptions = new Map();

  dispatch(command, payload) {
    if (this.#subscriptions.has(command)) {
      this.#subscriptions.get(command).forEach((handler) => handler(payload));
    } else {
      console.error(`No handlers for command: ${command}`);
    }

    this.#handlers.forEach((handler) => handler());
  }

  register(handler) {
    this.#handlers.push(handler);

    return () => {
      const idx = this.#handlers.indexOf(handler);
      this.#handlers.splice(idx, 1);
    };
  }

  subscribe(command, handler) {
    if (!this.#subscriptions.has(command)) {
      this.#subscriptions.set(command, []);
    }

    const handlers = this.#subscriptions.get(command);
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
