const invariant = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const INIT = '@@my-redux/INIT';

class Store {
  constructor(reducer, initialState) {
    invariant(typeof reducer === 'function', 'Tried to initialize store without reducer function');

    const state = reducer(initialState, { type: INIT });

    invariant(typeof state !== 'undefined', 'Your root reducer must not return an undefined state');

    this.state = state;
    this.reducer = reducer;
    this.subscribers = [];
  }

  getState = () => {
    return this.state;
  };

  dispatch = (action) => {
    invariant(action, 'Tried to dispatch without an action');

    const nextState = this.reducer(this.state, action);

    invariant(typeof nextState !== 'undefined', `Your reucer return undefined in response to ${action.type}`);

    this.state = nextState;
    this.subscribers.forEach(fn => fn());
  };

  subscribe = (fn) => {
    this.subscribers.push(fn);
  };

  replaceReducer = (newReducer) => {
    this.reducer = newReducer;
    this.dispatch({ type: INIT });
  };
}

export const createStore = (reducer, initialState) => {
  return new Store(reducer, initialState);
};
