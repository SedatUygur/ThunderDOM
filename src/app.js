import { Dispatcher } from "./helpers/dispatcher";

export const createApp = ({ state, view, reducers = {} }) => {
  const dispatcher = new Dispatcher();

  const renderApp = () => {
    return view(state, emit);
  };

  const subscriptions = [dispatcher.register(renderApp)];

  const emit = (event, payload) => {
    dispatcher.dispatch(event, payload);
  };

  for (const action in reducers) {
    const reducer = reducers[action];
    const subs = dispatcher.subscribe(action, (payload) => {
      state = reducer(state, payload);
    });

    subscriptions.push(subs);
  }
};
