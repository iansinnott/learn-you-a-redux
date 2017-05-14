import { createStore as createReduxStore, applyMiddleware } from 'my-redux';

import reducer from './modules';

const loggerMiddleware = (store) => {
  return (next) => {
    return (action) => {
      console.log(`%cDISPATCHING ${action.type}`, 'font-size:16px;color:yellow;');
      const result = next(action);
      console.log('%cdispatch done', 'font-size:16px;color:cyan;', store.getState());
      return result;
    };
  };
};

const initialState = undefined;

export default function createStore() {
  return createReduxStore(
    reducer,
    initialState,
    applyMiddleware(loggerMiddleware)
  );
}
