'use strict';

chrome.devtools.panels.create(
    'auto cat', 'icon.png', 'panel.html',
    function (panel) {
      // 面板创建时调用的代码
    }
);
