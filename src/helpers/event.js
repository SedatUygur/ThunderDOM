export const getEventName = (eventName) => {
  if (eventName.indexOf("on") == 0) {
    return eventName.slice(2).toLowerCase();
  }
  return null;
};

export const handleEvent = (event) => {
  const element = event.currentTarget;
  const handler = element._ui.listeners[event.type];
  handler(event);
};

export const updateListener = (element, event, handle) => {
  if (element._ui.listeners[event] === undefined) {
    element.addEventListener(event, handleEvent);
  }

  element._ui.listeners[event] = handle;
};
