// @ts-nocheck
import { getEventName, handleEvent, updateListener } from "./event";
import { setProps } from "../utilities/props";

export const applyDifference = (element, enqueue, childrenDifference) => {
  const children = Array.from(element.childNodes);

  childrenDifference.forEach((difference, index) => {
    const action = Object.keys(difference)[0];
    switch (action) {
      case "remove":
        children[index].remove();
        break;

      case "modify":
        modifyNode(children[index], difference.modify);
        break;

      case "create": {
        const child = createNode(difference.create);
        element.appendChild(child);
        break;
      }

      case "replace": {
        const child = createNode(difference.replace);
        children[index].replaceWith(child);
        break;
      }

      case "noop":
        break;
    }
  });
};

function createNode(enqueue, virtualNode) {
  // Create a text node
  if (virtualNode.text !== undefined) {
    const el = document.createTextNode(virtualNode.text);
    return el;
  }

  // Create the DOM element with the correct tag and already add our object of listeners to it.
  const el = document.createElement(virtualNode.tag);
  el._ui = { listeners: {} };

  for (const prop in virtualNode.properties) {
    const event = getEventName(prop);
    const value = virtualNode.properties[prop];
    // If it's an event set it otherwise set the value as a property.
    event !== null
      ? updateListener(el, event, value)
      : setProps(prop, value, el);
  }

  // Recursively create all the children and append one by one.
  for (const childVNode of virtualNode.children) {
    const child = createNode(childVNode);
    el.appendChild(child);
  }

  return el;
}

function modifyNode(element, enqueue, difference) {
  // Remove props
  for (const prop of difference.remove) {
    const event = getEventName(prop);
    if (event === null) {
      element.removeAttribute(prop);
    } else {
      element._ui.listeners[event] = undefined;
      element.removeEventListener(event, handleEvent);
    }
  }

  // Set props
  for (const prop in difference.set) {
    const value = difference.set[prop];
    const event = getEventName(prop);
    event !== null
      ? updateListener(element, event, value)
      : setProps(prop, value, element);
  }

  // Deal with the children
  applyDifference(element, difference.children);
}
