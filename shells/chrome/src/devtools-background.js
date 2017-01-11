'use strict';

chrome.devtools.panels.create(
    'Auto Cat', 'icon.png', 'devtools.html',
    function (panel) {
      // 面板创建时调用的代码
    }
);
console.error('asdsadsa');
const d = 1;

var page_getProperties = function() {
  var data = $0 ? $0.dataset : {};
  const copy = Object.assign({}, data);
  copy.
  console.error($0);
  return copy;
}


chrome.devtools.panels.elements.createSidebarPane(
  "Auto Cat",
  function(sidebar) {
    function updateElementProperties() {
      sidebar.setExpression("(" + page_getProperties.toString() + ")()");
    }
    updateElementProperties();
    chrome.devtools.panels.elements.onSelectionChanged.addListener(
      updateElementProperties);
  });


