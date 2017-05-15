/**
 * NOTE: Redux does the compose slightly differently, but everything still seems
 * to work fine.
 *
 * Questions yet unresolved:
 *
 * 1. Why is createStore passed rather than a store instance itself? Why
 *    "enhance" createStore rather than a store instance?
 * 2. How does middlewareApi.dispatch end up dispatching through all the
 *    middleware? What exactly is it referencing vs `next` in any of the
 *    middlewares?
 */
export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

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

    const chain = middlewares.map(fn => fn(middlewareApi));

    // Hm, my last question is how the dispatch and next functions differ. How
    // does calling the middlewareAPI.dispatch function still dispatch through
    // all the middleware
    dispatch = compose(...chain)(dispatch);

    return {
      dispatch,
      getState: store.getState,
      replaceReducer: store.replaceReducer,
      subscribe: store.subscribe,
    };
  };
};
