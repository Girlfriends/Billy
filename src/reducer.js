import { Map } from "immutable";

function setState(state, newState) {
  return state.merge(newState);
}

export default function (state = Map(), action = 'NOOP') {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'ADD_NOTE':
      return addNode(state, action.node);
    default:
  }
  return state;
}
