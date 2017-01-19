// This is the devtools script, which is called when the user opens the
// Chrome devtool on a page. We check to see if we global hook has detected
// Vue presence on the page. If yes, create the Vue panel; otherwise poll
// for 10 seconds.

let created = false;
let checkCount = 0;

chrome.devtools.network.onNavigated.addListener(createPanel);
createPanel();

function createPanel () {
  if (created || checkCount++ > 10) {
    return;
  }
  created = true;
  chrome.devtools.panels.create(
    'Auto Cat', 'icons/128.png', 'devtools.html',
    function (panel) {
      // panel loaded
      console.error('panel');
      console.error(panel);
    }
  );
}

const getProperties = (dom) => {
  if (!dom) {
    return {
      __proto__: null
    };
  }
  let clientY = 0;
  let clientX = 0;
  let parentDom = dom;
  while (parentDom) {
    clientY += parentDom.offsetTop;
    clientX += parentDom.offsetLeft;
    parentDom = parentDom.offsetParent;
  };

  const attributes = {
    __proto__: null,
    bind: 'click',
    $clientX: clientX,
    $clientY: clientY,
    $height: dom.offsetHeight,
    $width: dom.offsetWidth
  };

  if (dom.attributes) {
    Array.from(dom.attributes).forEach(({nodeName, nodeValue}) => {
      attributes[nodeName] = nodeValue;
    });
  }
  return attributes;
};

chrome.devtools.panels.elements.createSidebarPane(
  'Auto Cat',
  function (sidebar) {
    function updateElementProperties () {
      sidebar.setExpression('(' + getProperties.toString() + ')($0)');
    }
    updateElementProperties();
    chrome.devtools.panels.elements.onSelectionChanged.addListener(
      updateElementProperties);
  });
