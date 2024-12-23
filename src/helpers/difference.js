// @ts-nocheck
import { getEventName, handleEvent, updateListener } from "./event.js";
import { setProp } from "../utilities/props.js";

export const applyDifference = (element, enqueue, childrenDifference) => {
  const childrenNodes = Array.from(element.childNodes);

  childrenDifference.forEach((difference, index) => {
    const diffAction = Object.keys(difference)[0];
    switch (diffAction) {
      case "remove":
        childrenNodes[index].remove();
        break;

      case "modify":
        modifyNode(childrenNodes[index], enqueue, difference.modify);
        break;

      case "create": {
        const child = createNode(enqueue, difference.create);
        element.appendChild(child);
        break;
      }

      case "replace": {
        const child = createNode(enqueue, difference.replace);
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
  if (virtualNode && virtualNode.text) {
    const textNode = document.createTextNode(virtualNode.text);
    return textNode;
  }

  // Create the DOM element with the correct tag and already add our object of listeners to it.
  if (virtualNode) {
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
}

function modifyNode(element, enqueue, difference) {
  // Remove props
  for (const prop of difference.remove) {
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

// diff two virtual nodes
function diffOne(l, r) {
  const isText = l.text !== undefined;
  if (isText) {
    return l.text !== r.text ? { replace: r } : { noop: true };
  }

  if (l.tag !== r.tag) {
    return { replace: r };
  }

  const remove = [];
  const set = {};

  for (const prop in l.properties) {
    if (r.properties[prop] === undefined) {
      remove.push(prop);
    }
  }

  for (const prop in r.properties) {
    if (r.properties[prop] !== l.properties[prop]) {
      set[prop] = r.properties[prop];
    }
  }

  const children = diffList(l.children, r.children);
  const noChildrenChange = children.every((e) => e.noop);
  const noPropertyChange =
    remove.length === 0 && Array.from(Object.keys(set)).length == 0;

  return noChildrenChange && noPropertyChange
    ? { noop: true }
    : { modify: { remove, set, children } };
}

export const diffList = (ls, rs) => {
  const length = Math.max(ls.length, rs.length);

  return Array.from({ length }).map((_, i) =>
    ls[i] === undefined
      ? { create: rs[i] }
      : rs[i] == undefined
        ? { remove: true }
        : diffOne(ls[i], rs[i]),
  );
};
