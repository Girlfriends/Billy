import { createStore } from 'redux';
import reducer from './reducer';

let store = createStore(reducer);

export function getStore() {
  return store;
}
