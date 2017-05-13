module.exports = function exposeGlobals(root) {
  root.store = require('./store.js').default;
};
