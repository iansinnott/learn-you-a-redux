/**
 * This is the naive implementation. The primary issue I've seen so far is that
 * calling store.dispatch from within middleware will not send that action
 * through all the middleware. For example, the logger middleware misses out on
 * actions dispatched from an epic. This is because under the hood
 * redux-observable is calling store.dispatch for all actions that come through
 * the stream, but those actions never show up in the logging middleware because
 * of this naive implementation.
 */
export const applyMiddleware = (...middlewares) => {
  return (store) => {
    let dispatch = store.dispatch;

    // NOTE: The reverse seems to be consistent with redux. It functions much
    // more like a compose this way
    middlewares.reverse().forEach(middleware => {
      dispatch = middleware(store)(dispatch);
    });

    return {
      dispatch,
      getState: store.getState,
      replaceReducer: store.replaceReducer,
      subscribe: store.subscribe,
    };
  };
};
