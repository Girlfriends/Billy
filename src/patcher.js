/* jshint node:true */
/* jshint browser:true */
// 'use strict';

import PIXI from "./pixijs/pixi";
import ObjectNode from "./ObjectNode";
import ToneTree from "./ToneTree";
import $ from 'jquery';
import { getStore } from './Billy';
import { createNode } from './actions';

var mouseX, mouseY;
var renderer, stage;
var objectNodes = {};
var toneTree = new ToneTree();

$(document).ready(function() {
  renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor: 0x1099bb});
  document.body.appendChild(renderer.view);
  stage = new PIXI.Container();

  let animate = function() {
    requestAnimationFrame( animate );
    renderer.render(stage);
  };
  animate();
});

window.addEventListener("keydown", handleKeyDown, true);
window.addEventListener("mousemove", handleMouseMove, true);
let unsubscribe = getStore().subscribe(handleChange);

function handleKeyDown(event) {
  if (event.keyCode === 78) {
    getStore().dispatch(createNode({
      position: {
        x: mouseX,
        y: mouseY
      }
    }));
    event.preventDefault();
  }
}

function handleMouseMove(event) {
  mouseX = event.pageX;
  mouseY = event.pageY;
}

function selectUINodes(state) {
  return state.getIn(['object_graph', 'objects']);
}

let currentValue;
function handleChange() {
  let previousValue = currentValue;
  currentValue = selectUINodes(getStore().getState());
  if (previousValue !== currentValue) {
      synchronizeNodes();
  }
}

function synchronizeNodes() {
  selectUINodes(getStore().getState()).forEach(function(node) {
    let key = node.get('uid').toString();
    let px = node.getIn(['position', 'x']);
    let py = node.getIn(['position', 'y']);
    if (!objectNodes.hasOwnProperty(key)) {
      let objnode = new ObjectNode(100, 30);
      objnode.position = new PIXI.Point(px, py);
      stage.addChild(objnode);
      objectNodes[key] = objnode;
    }
  });
}
