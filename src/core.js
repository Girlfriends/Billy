export function setState(state, newState) {
  return state.merge(newState);
}

export function addNode(state, node) {
  return state.updateIn(
    ['nodes'],
    List(node),
    nodes => nodes.push(node)
  );
}
