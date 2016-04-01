/* jshint node:true */
/* jshint browser:true */
// 'use strict';

import PIXI from "./pixijs/pixi";
import ObjectNode from "./ObjectNode";
import $ from 'jquery';
import { getStore } from './Billy';
import { createNode } from './actions';

var mouseX, mouseY;
var renderer, stage;

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

function handleKeyDown(event) {
  if (event.keyCode === 78) {
    // let objnode = new ObjectNode(100, 30);
    // objnode.position = new PIXI.Point(mouseX, mouseY);
    // stage.addChild(objnode);

    getStore().dispatch(createNode({}));

    event.preventDefault();
  }
}

function handleMouseMove(event) {
  mouseX = event.pageX;
  mouseY = event.pageY;
}
