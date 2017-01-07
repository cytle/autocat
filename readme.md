## 需要实现的目标

0. 向页面插入脚本,监听和拦截请求
1. 自动进入页面
    - 设置用户信息和店铺等特征信息进入页面
2. 方便的选择元素
    - 通过chrome元素选择进行选择元素
    - 进行动作时保证为元素
3. 动作
    - 模拟点击,等待等动作
    - 需要监听页面加载完成等事件
    - 动作能自动进行和逐步进行
4. 结果获取
    - 获取指定元素的内容

##　chrome 插件需要满足的功能
- 向页面插入脚本,监听和拦截请求
    - 使用 devtools.network API 获取网络请求的有关信息。
    - 使用 chrome.webRequest API 监控与分析流量，还可以实时地拦截、阻止或修改请求。
    - 注意：该 API 目前无人维护，什么时候正式支持还没有具体的计划。使用 chrome.declarativeWebRequest API 实时地拦截、阻止或修改请求，它比 chrome.webRequest API 要快得多，因为您注册的规则在浏览器中而不是 JavaScript 引擎中求值，这样就减少了来回延迟，效率更高。
- 通过chrome元素选择进行选择元素
    - 使用 devtools.panels API 创建面板并与之交互。
    - 使用 devtools.inspectedWindow API 获取审查窗口的有关信息，并在审查的窗口中执行代码。

