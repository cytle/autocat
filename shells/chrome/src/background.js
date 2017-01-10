
var openCount = 0;
chrome.runtime.onConnect.addListener(function (port) {
    if (port.name === 'devtools-page') {
        if (openCount === 0) {
            alert('开发者工具窗口打开。');
        }
        openCount++;

        port.onDisconnect.addListener(function (port) {
            openCount--;
            if (openCount === 0) {
                alert('最后一个开发者工具窗口关闭。');
            }
        });
    }
});
