import { applyDifference } from "./helpers/difference";
import { getDifferenceArraysSequence } from "./utilities/arrays";

// Start managing the contents of an HTML element.
export const init = (root, state, update, view) => {
  let appState = state; // client application state
  let nodes = [];
  let queue = [];

  function enqueue(message) {
    queue.push(message);
  }

  // applies the current state
  function applyState() {
    let newNodes = view(appState);
    applyDifference(root, getDifferenceArraysSequence(nodes, newNodes));
    nodes = newNodes;
  }

  function updateState() {
    if (queue.length > 0) {
      let messages = queue;
      // replace queue with an empty array so that we don't process newly queued messages on this round.
      queue = [];

      for (let message of messages) {
        appState = update(appState, message);
      }

      applyState();
    }

    // schedule next round of state updates
    window.requestAnimationFrame(updateState);
  }

  applyState(); // apply initial state
  updateState(); // kick-off state update cycle

  return { enqueue };
};
