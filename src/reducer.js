import { Map } from 'immutable';
import { createNode, updateNodeUI } from './core';

function setState(state, newState) {
  return state.merge(newState);
}

export default function reducer(state = Map(), action = 'NOOP') {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action.state);
    case 'CREATE_NODE':
      return createNode(state, action.node);
    case 'UPDATE_NODE_UI':
      return updateNodeUI(state, action.nodeUID, action.uiDescription);
    default:
  }
  return state;
}
