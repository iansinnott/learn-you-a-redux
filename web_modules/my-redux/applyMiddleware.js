/**
 * This is the naive implementation. The primary issue I've seen so far is that
 * calling store.dispatch from within middleware will not send that action
 * through all the middleware. For example, the logger middleware misses out on
 * actions dispatched from an epic. This is because under the hood
 * redux-observable is calling store.dispatch for all actions that come through
 * the stream, but those actions never show up in the logging middleware because
 * of this naive implementation.
 */

export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
export const pipe = (...fns) => fns.reduceRight((f, g) => (...args) => f(g(...args)));

const sum = a => b => a + b;
const mult = a => b => a * b;
const sumMult = pipe(mult(2), sum(3));
console.assert(sumMult(7) === 17, 'Should equal 12');

export const applyMiddleware = (...middlewares) => {
  return (createStore) => (reducer, initialState) => {
    const store = createStore(reducer, initialState);
    let dispatch = store.dispatch;

    // Create the middleware API that will be passed to all middleware. This is
    // where we lock in the original dispatch so that any middleware can use it.
    const middlewareApi = {
      getState: store.getState,
      dispatch: (action) => dispatch(action), // Lock in dispatch
    };

    const dispatches = middlewares.map(fn => fn(middlewareApi));

    // Hm, my last question is how the dispatch and next functions differ. How
    // does calling the middlewareAPI.dispatch function still dispatch through
    // all the middleware
    dispatch = pipe(...dispatches)(dispatch);

    return {
      dispatch,
      getState: store.getState,
      replaceReducer: store.replaceReducer,
      subscribe: store.subscribe,
    };
  };
};
