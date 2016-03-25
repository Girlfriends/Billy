/* jshint node:true */
/* jshint browser:true */
// 'use strict';

import UIDStore from "./uid_store";
import Tone from "tone";

class ToneTree {
  constructor() {
    this.nodeUIDStore = new UIDStore();
    this.nodeMap = {};
  }
  addOscillator(type, frequency) {
    let uid = this.nodeUIDStore.getUID();
    let omniOsc = new Tone.OmniOscillator(frequency, type).toMaster();
    omniOsc.start();
    this.nodeMap[uid] = omniOsc;
    return uid;
  }
  removeOscillator(uid) {
    if (this.nodeMap.hasOwnProperty(uid)) {
      let omniOsc = this.nodeMap[uid];
      omniOsc.stop();
      this.nodeUIDStore.returnUID(uid);
      delete this.nodeMap[uid];
      return 1;
    }
    return 0;
  }
}

let $ = require("jquery");
let tt = new ToneTree();

function addRandomOscillator() {
  let rfreq = Math.random() * 440.0 + 20.0;
  let newUID = tt.addOscillator("pwm", rfreq);
  $('div.oscillators').append('<button type="button" id=' + newUID + '>' + newUID + ':' + rfreq + '</button>');
  $('button#' + newUID).click(() => {
    $('button#' + newUID).remove();
    tt.removeOscillator(newUID);
  });
}

$(document).ready(function() {
  $("button[name=add]").click(addRandomOscillator);
});
