/* jshint node:true */
/* jshint browser:true */
// 'use strict';

import Tone from "tone";
import { getStore } from './Billy';

class ToneTree {
  constructor() {
    this.nodeMap = {};
    this.unsubscribe = getStore().subscribe(this.handleChange.bind(this));
    this.currentNodes = undefined;
  }
  addOscillator(uid, type, frequency) {
    console.log("Adding oscillator");
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
  synchronizeNodes() {
    console.log("Synchronizing nodes");
    this.selectUINodes(getStore().getState()).forEach(function(node) {
      let key = node.get('uid').toString();
      if (!this.nodeMap.hasOwnProperty(key)) {
        this.addOscillator(key, 'pwm', (Math.random() * 1000) + 40);
      }
    }, this);
  }
  handleChange() {
    console.log("Tone changed");
    let previousNodes = this.currentNodes;
    this.currentNodes = selectUINodes(getStore().getState());
    if (previousNodes !== this.currentNodes) {
        this.synchronizeNodes();
    }
  }
  selectUINodes(state) {
    return state.getIn(['object_graph', 'objects']);
  }
}

export default ToneTree;
