// This is the backend that is injected into the page that a Vue app lives in
// when the Vue Devtools panel is activated.

import { highlight, unHighlight } from './highlighter';
import { stringify } from '../util';
import Element from './element';

// hook should have been injected before this executes.
const hook = window.__AUTO_CAT_DEVTOOLS_GLOBAL_HOOK__;

const instanceMap = window.__AUTO_CAT_DEVTOOLS_INSTANCE_MAP__ = new Map();
let bridge;
export function initBackend (_bridge) {
  bridge = _bridge;
  bridge.log('initBackend is capturing: ' + hook.capturing);
  connect();
  if (hook.capturing) {
    connect();
  } else {
    hook.once('capture', connect);
  }
}

function connect () {
  hook.currentTab = 'components';
  bridge.on('switch-tab', tab => {
    hook.currentTab = tab;
    if (tab === 'components') {
      flush();
    }
  });

  // the backend may get injected to the same page multiple times
  // if the user closes and reopens the devtools.
  // make sure there's only one flush listener.
  hook.off('flush');
  hook.on('flush', () => {
    if (hook.currentTab === 'components') {
      flush();
    }
  });
  bridge.on('enter-instance', id => highlight(instanceMap.get(id)));
  bridge.on('leave-instance', unHighlight);

  bridge.log('backend ready.');
  bridge.send('ready', 1.01);
  console.log('[vue-devtools] Ready. Detected Vue v');
  scan();
}

/**
 * Scan the page for root level Vue instances.
 */

function scan () {
  document.addEventListener('mouseleave', unHighlight);
  walk(document, function (node) {
    node.addEventListener('mouseenter', enterFn);
  });
}

let currentEl = null;
function enterFn (event) {
  if (currentEl) {
    currentEl.removeEventListener('click', clickFn);
  }
  currentEl = event.target;
  currentEl.addEventListener('click', clickFn);
  highlight(new Element(currentEl));
}

function clickFn (event) {
  bridge.send('elements:bind-action', stringify({
    event: 'click',
    elSelector: toElSelector(event.target, [])
  }));
}

function toElSelector (el, selector) {
  do {
    if (el.nodeName.toLowerCase() === 'body') {
      break;
    }
    if (el.id) {
      selector.unshift(el.nodeName + '#' + el.id);
      break;
    }
    const nth = nthOfType(el);
    selector.unshift(el.nodeName + `:nth-of-type(${nth})`);
  } while ((el = el.parentElement));

  return selector.join('>');
}

/**
 * 判断当前元素是父元素的第几个元素
 * @param  {Node} el
 * @return {Interger}
 */

function nthOfType (el) {
  let i = 0;
  while ((el = el.previousSibling)) {
    i++;
  }
  return i;
}
/**
 * DOM walk helper
 *
 * @param {NodeList} nodes
 * @param {Function} fn
 */

function walk (node, fn) {
  if (node.childNodes) {
    Array.prototype.forEach.call(node.childNodes, function (node) {
      const stop = fn(node);
      if (!stop) {
        walk(node, fn);
      }
    });
  }
}

function flush () {
  const payload = stringify({
  });
  bridge.send('flush', payload);
}
