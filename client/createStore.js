import { createStore as createReduxStore, applyMiddleware } from 'redux';

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

export default function createStore() {
  return createReduxStore(
    reducer,
    applyMiddleware(loggerMiddleware)
  );
}
