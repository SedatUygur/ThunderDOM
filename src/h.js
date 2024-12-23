import { VirtualNode } from "./vnode";

// Create an HTML element description
export const h = (tag, props, children) => {
  return new VirtualNode({ tag, props, children });
};

// Create a text element description
export const text = (content) => {
  return new VirtualNode({ text: content });
};
