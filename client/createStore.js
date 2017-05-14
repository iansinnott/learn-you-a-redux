import { createStore as createReduxStore, applyMiddleware } from 'my-redux';
import { createEpicMiddleware } from 'redux-observable';
import 'rxjs'; // Import all operators

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

const epic = (action$, store) =>
  action$.ofType('PING')
    .do(() => console.warn('just saw ping'))
    .delay(1000)
    .mapTo({ type: 'PONG' });

const initialState = undefined;

export default function createStore() {
  return createReduxStore(
    reducer,
    initialState,
    applyMiddleware(
      createEpicMiddleware(epic),
      loggerMiddleware,
    )
  );
}
