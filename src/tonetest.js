/* jshint node:true */
/* jshint browser:true */
// 'use strict';

console.log("File loaded");
var $ = require("jquery");
var Tone = require("Tone");
var synth = new Tone.SimpleSynth().toMaster();

function playArpeggio() {
  console.log("Arpeggio time");
  synth.triggerAttackRelease("A2", "8n",  "+4n * 0");
  synth.triggerAttackRelease("C#3", "8n", "+4n * 1");
  synth.triggerAttackRelease("E3", "8n",  "+4n * 2");
  synth.triggerAttackRelease("A3", "8n",  "+4n * 3");
  synth.triggerAttackRelease("C#4", "8n", "+4n * 4");
  synth.triggerAttackRelease("E4", "8n",  "+4n * 5");
  synth.triggerAttackRelease("A4", "8n",  "+4n * 6");
}

$(document).ready(function() {
  $("button[name=arpeggio]").click(playArpeggio);
});
