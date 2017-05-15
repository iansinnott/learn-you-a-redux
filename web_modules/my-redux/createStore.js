// The initialization action that kicks everything off. No reducers should
// respond to this action
const INIT = '@@my-redux/INIT';

// NOTE: Redux doesn't use a class instance, which is probably for the best, but
// I found it intuitive to use a formal class to demonstrate the ideas behind
// the implementation
class Store {
  constructor(reducer, initialState) {
    // Initialize state by calling the reducer with the initialization action
    const state = reducer(initialState, { type: INIT });
    this.state = state;
    this.reducer = reducer;
    this.subscribers = [];
  }

  getState = () => {
    return this.state;
  };

  dispatch = (action) => {
    const nextState = this.reducer(this.state, action);
    this.state = nextState;
    this.subscribers.forEach(fn => fn());
  };

  subscribe = (fn) => {
    this.subscribers.push(fn);

    return () => {
      const index = this.subscribers.indexOf(fn);
      this.subscribers.splice(index, 1);
    };
  };

  replaceReducer = (newReducer) => {
    this.reducer = newReducer;
    this.dispatch({ type: INIT });
  };
}

export const createStore = (reducer, initialState, enhance) => {
  if (typeof enhance === 'function') {
    return enhance(createStore)(reducer, initialState);
  } else {
    return new Store(reducer, initialState);
  }
};
