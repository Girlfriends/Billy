import { Map, fromJS } from 'immutable';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import reducer from '../src/reducer';

describe('Testing the test', () => {
  it('seems to be working alright', () => {});
});

describe('Modifying the state', () => {
  it('adds an object', () => {
    let state = fromJS({});
    let action = {type:'CREATE_NODE', node:{}};
    let nextState = reducer(state, action);
    let object = fromJS({ 'uid': 0 });
    let objects = Map().set(0, object);

    expect(nextState).to.equal(fromJS({
      object_graph : {
        root_uid : 1,
        objects : objects
      }
    }));
  });

  it('modifies the position of an object', () => {
    let state = reducer(Map(), {type:'CREATE_NODE', node:{}});
    let action = {
      type : 'UPDATE_NODE_UI',
      nodeUID : 0,
      uiDescription : {'position': [0, 0] }
    };
    let nextState = reducer(state, action);
    let object = fromJS({ 'uid': 0 });
    let objects = Map().set(0, object);
    let uiDescription = fromJS({ position: [0, 0] });
    let nodes = Map().set(0, uiDescription);

    expect(nextState).to.equal(fromJS({
      object_graph : {
        root_uid : 1,
        objects : objects
      },
      ui : {
        nodes : nodes
      }
    }));
  });
});
