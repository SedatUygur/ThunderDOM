import { h, text } from "./h.js";

const game = h("div", {}, [
  h("h1", {}, text("Play Game")),
  h("button", { onClick: this }, [text("Resume")]),
  h("button", { onClick: this }, [text("Quit")]),
]);

console.log(JSON.stringify(game));
