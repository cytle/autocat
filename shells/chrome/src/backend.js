// this is injected to the app page when the panel is activated.

import { initBackend } from 'src/backend';
import Bridge from 'src/bridge';
import debugCreator from 'debug';

const debug = debugCreator('chrome:backend');
const sendDebug = debugCreator('chrome:backend:send');

window.addEventListener('message', handshake);

function handshake (e) {
  if (e.data.source === 'vue-devtools-proxy' && e.data.payload === 'init') {
    debug('handshake init');

    window.removeEventListener('message', handshake);

    let listeners = [];
    const bridge = new Bridge({
      listen (fn) {
        var listener = evt => {
          if (evt.data.source === 'vue-devtools-proxy' && evt.data.payload) {
            fn(evt.data.payload);
          }
        };
        window.addEventListener('message', listener);
        listeners.push(listener);
      },
      send (data) {
        sendDebug(data);
        window.postMessage({
          source: 'vue-devtools-backend',
          payload: data
        }, '*');
      }
    });

    bridge.on('shutdown', () => {
      listeners.forEach(l => {
        window.removeEventListener('message', l);
      });
      listeners = [];
    });

    initBackend(bridge);
    // debug(window.$0);
    // chrome.devtools.panels.elements.onSelectionChanged.addListener(function () {
    //   debug('onSelectionChanged');
    // });
  }
}
