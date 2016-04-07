let jsdom = require('jsdom');
let fs = require("fs");
import { expect, assert } from 'chai';
import { describe, it } from 'mocha';

describe('Patcher window', () => {
  let window;
  let document;
  var virtualConsole = jsdom.createVirtualConsole();
  virtualConsole.on("jsdomError", function (error) {
    console.error(error.stack, error.detail);
  });
  document = jsdom.jsdom(fs.readFileSync("./src/index.html"), {
        parsingMode : 'html',
        resourceLoader: function (resource, callback) {
          var pathname = resource.url.pathname;
          if (pathname.endsWith('.js')) {
            resource.url.pathname = pathname.replace(".", "./lib");
            return resource.defaultFetch(callback);
          } else {
            return resource.defaultFetch(callback);
          }
        },
        features    : {
          FetchExternalResources    : ['script'],
          ProcessExternalResources  : ['script'],
          MutationEvents            : '2.0',
        },
        virtualConsole
      });
  window = document.defaultView;

  it('has a document', () => {
    let div = window.document.createElement('div');
    expect(div.nodeName).eql('DIV');
  });
  it('has a canvas element', () => {
    expect(window.document.getElementsByTagName('canvas').length).above(0);
  });

  it('creates a node on key n down', () => {
    var nevent = window.document.createEvent('HTMLEvents');
    nevent.keyDown = nevent.which = 78;
    nevent.initEvent('keydown', false, true);
    window.dispatchEvent(nevent);
    expect(window.document.getElementById('testy')).to.be.ok;
  });
});
