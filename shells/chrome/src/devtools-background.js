'use strict';

chrome.devtools.panels.create(
    'auto cat', 'icon.png', 'devtools.html',
    function (panel) {
      // 面板创建时调用的代码
    }
);
