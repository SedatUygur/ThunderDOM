// @ts-nocheck
import { getEventName, handleEvent, updateListener } from "./event";
import { setProp } from "../utilities/props";

export const applyDifference = (element, enqueue, childrenDifference) => {
  const childrenNodes = Array.from(element.childNodes);

  childrenDifference.forEach((difference, index) => {
    const diffAction = Object.keys(difference)[0];
    switch (diffAction) {
      case "delete":
        childrenNodes[index].remove();
        break;

      case "modify":
        modifyNode(childrenNodes[index], enqueue, difference.modify);
        break;

      case "insert": {
        const child = createNode(enqueue, difference.insert);
        element.appendChild(child);
        break;
      }

      case "move": {
        const child = createNode(enqueue, difference.move);
        childrenNodes[index].replaceWith(child);
        break;
      }

      case "noop":
        break;
    }
  });
};

function createNode(enqueue, virtualNode) {
  // Create a text node
  if (virtualNode.text) {
    const textNode = document.createTextNode(virtualNode.text);
    return textNode;
  }

  // Create the DOM element with the correct tag and already add our object of listeners to it.
  const element = document.createElement(virtualNode.tag);
  element._ui = { listeners: {}, enqueue };

  for (const property in virtualNode.properties) {
    const eventName = getEventName(property);
    const value = virtualNode.properties[property];
    // If it's an event set it otherwise set the value as a property.
    eventName
      ? updateListener(element, eventName, value)
      : setProp(property, value, element);
  }

  // Recursively create all the children and append one by one.
  for (const childVNode of virtualNode.children) {
    const childNode = createNode(enqueue, childVNode);
    element.appendChild(childNode);
  }

  return element;
}

function modifyNode(element, enqueue, difference) {
  // Remove props
  for (const prop of difference.delete) {
    const removeEventName = getEventName(prop);
    if (!removeEventName) {
      element.removeAttribute(prop);
    } else {
      element._ui.listeners[removeEventName] = undefined;
      element.removeEventListener(removeEventName, handleEvent);
    }
  }

  // Set props
  for (const prop in difference.set) {
    const value = difference.set[prop];
    const eventName = getEventName(prop);
    eventName
      ? updateListener(element, eventName, value)
      : setProp(prop, value, element);
  }

  // Deal with the children
  applyDifference(element, enqueue, difference.children);
}
