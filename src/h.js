// Create an HTML element description
export const h = (tag, props, children) => {
  return { tag, props, children };
};

// Create a text element description
export const text = (content) => {
  return { text: content };
};
