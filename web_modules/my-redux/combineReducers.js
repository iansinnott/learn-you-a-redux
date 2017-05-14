export const combineReducers = (reducers) => {
  return (state = {}, action) => {
    const newState = {};
    Object.keys(reducers).forEach(k => {
      newState[k] = reducers[k](state[k], action);
    });
    return newState;
  };
};
