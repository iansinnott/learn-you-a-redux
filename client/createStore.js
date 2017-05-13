import { createStore as createReduxStore } from 'redux';

import reducer from './modules';

export default function createStore() {
  return createReduxStore(
    reducer
  );
}
