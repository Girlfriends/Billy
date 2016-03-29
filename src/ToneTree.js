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
