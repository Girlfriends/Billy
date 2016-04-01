import { List, Map, fromJS } from 'immutable';

export function setState(state, newState) {
  return state.merge(newState);
}

export function createNode(state, node) {
  // Grab a UID for your node
  var uid;
  let uids = state.getIn(['object_graph', 'free_uids'], List());

  if (uids.size === 0) {
    let rootUID = state.getIn(['object_graph', 'root_uid'], 0);
    state = state.setIn(['object_graph', 'root_uid'], rootUID+1);
    uid = rootUID;
  } else {
    uid = uids.last();
    state = state.setIn(['object_graph', 'free_uids'], uids.pop());
  }
  let newNode = fromJS({ 'uid': uid });
  return state.updateIn(['object_graph', 'objects'],
    Map(),
    objects => objects.set(uid, newNode));
}

export function updateNodeUI(state, nodeUID, uiDescription) {
  return state.mergeDeepIn(['ui', 'nodes', nodeUID], uiDescription);
}
