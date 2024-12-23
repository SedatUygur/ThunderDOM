/* eslint-disable no-undef */
// @ts-nocheck
import { h, text } from "./h.js";
import { init } from "./init.js";

export const ThunderDOM = (function () {
  return {
    init,
    h,
    text,
  };
})();

if (typeof define !== "undefined" && define.amd) {
  // AMD
  define([], function () {
    return ThunderDOM;
  });
} else if (typeof module !== "undefined" && module.exports) {
  // CommonJS
  module.exports = ThunderDOM;
} else if (typeof window !== "undefined") {
  // Script tag
  window.ThunderDOM = ThunderDOM;
}

/*const game = h("div", {}, [
  h("h1", {}, text("Play Game")),
  h("button", { onClick: this }, [text("Resume")]),
  h("button", { onClick: this }, [text("Quit")]),
]);

console.log(JSON.stringify(game));*/
