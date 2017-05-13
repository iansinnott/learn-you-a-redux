const prefix = s => `counter/${s}`;

const INCREMENT = prefix('INCREMENT');
const DECREMENT = prefix('DECREMENT');

/* Reducers
 * ======================================================================= */
export default function reducer(state = 0, action) {
  switch (action.type) {
  case INCREMENT:
    return state + 1;
  case DECREMENT:
    return state - 1;
  default:
    return state;
  }
}

/* Actions
 * ======================================================================= */
export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});

/* Getters
 * ======================================================================= */
export const getCount = state => state.counter;
