chrome.devtools.panels.create(
    'Auto Cat', 'icon.png', 'devtools.html',
    function (panel) {
      // 面板创建时调用的代码
    }
);

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
