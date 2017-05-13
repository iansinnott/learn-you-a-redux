/**
 * It may seem silly to have a file just for this, but we do this so that the
 * reactk-static-webpack-plugin can read this file and use the store.
 */
import createStore from './createStore.js';

export default createStore();
