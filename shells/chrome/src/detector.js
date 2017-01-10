window.addEventListener('message', e => {
  if (e.source === window && e.data.vueDetected) {
    chrome.runtime.sendMessage(e.data);
  }
});

function detect (win) {
  console.error('detect');
  setTimeout(() => {
    win.postMessage({
      devtoolsEnabled: true,
      autoCatDetected: true
    }, '*');
  }, 100);
}

// inject the hook
const script = document.createElement('script');
script.textContent = ';(' + detect.toString() + ')(window)';
document.documentElement.appendChild(script);
script.parentNode.removeChild(script);
