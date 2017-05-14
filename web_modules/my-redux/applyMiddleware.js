export const applyMiddleware = (...middlewares) => {
  return (store) => {
    let dispatch = store.dispatch;

    middlewares.forEach(middleware => {
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
