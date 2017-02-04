// This is a content-script that is injected only when the devtools are
// activated. Because it is not injected using eval, it has full privilege
// to the chrome runtime API. It serves as a proxy between the injected
// backend and the Vue devtools panel.
import debugCreator from 'debug';

const sendMessageToBackendDebug = debugCreator('chrome:proxy');
const sendMessageToDevtoolsDebug = debugCreator('chrome:proxy:sendMessageToDevtools');

const port = chrome.runtime.connect({
  name: 'content-script'
});

port.onMessage.addListener(sendMessageToBackend);
window.addEventListener('message', sendMessageToDevtools);
port.onDisconnect.addListener(handleDisconnect);

sendMessageToBackend('init');

function sendMessageToBackend (payload) {
  sendMessageToBackendDebug(payload);
  window.postMessage({
    source: 'vue-devtools-proxy',
    payload: payload
  }, '*');
}

function sendMessageToDevtools (e) {
  if (e.data && e.data.source === 'vue-devtools-backend') {
    const payload = e.data.payload;
    if (payload.event === 'log') {
      sendMessageToDevtoolsDebug(payload.payload);
    } else {
      sendMessageToDevtoolsDebug(payload);
      port.postMessage(payload);
    }
  }
}

function handleDisconnect () {
  window.removeEventListener('message', sendMessageToDevtools);
  sendMessageToBackend('shutdown');
}

