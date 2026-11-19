# dsh-wechat-theme

DeepSeek Harness Web GUI 的微信风格主题。整个插件只做两件事：注册一层主题 token，加三个小装饰和一张压缩卡片；
禁用插件时全部撤掉，恢复宿主原配色。

**在线演示：** <https://mingtian-lii.github.io/dsh-wechat-theme/demo.html> — 静态配色预览（假数据，不是运行中的应用）。

## 截图

![浅色模式](https://raw.githubusercontent.com/Mingtian-Lii/dsh-wechat-theme/master/assets/screenshots/light.png)

![深色模式](https://raw.githubusercontent.com/Mingtian-Lii/dsh-wechat-theme/master/assets/screenshots/dark.png)

![上下文压缩卡片](https://raw.githubusercontent.com/Mingtian-Lii/dsh-wechat-theme/master/assets/screenshots/compacted.png)

## 改了什么

- **配色**：27 个 `--dsw-*` token，浅色/深色各一套。浅色：浅灰聊天画布（`#ededed`）、更深的
  会话列表（`#e2e2e2`）、微信绿强调色（`#0a8f45`）、绿色圆形发送按钮（`#06a852`）、绿色发出气泡
  （`#95ec69`）、微信经典蓝灰链接（`#576b95`）；深色：`#111111` 画布、`#2f5f3f` 气泡、`#3ecf72`
  强调色。
- **旧版兼容变量**：五个 `--dsh-color-*` 名字，旧插件还在用它们并带硬编码兜底。装了这类插件时，
  其统计栏会跟随配色（费用从内置蓝变主题绿）；没装时这些变量只是惰性存在，不构成依赖。
- **上下文使用率**：宿主上下文圆环旁边加一个状态点，低于 70% 绿、70% 起琥珀、90% 起红，
  悬浮显示「上下文已用 N%」。数据来自宿主自己的 `contextPressure` 投影，投影不存在时不渲染。
- **深度索求**：宿主原本是蓝色的「深度索求中…」活动文字（`--dsw-alias-label-deep-diving`）跟随主题绿。
- **压缩卡片**：宿主原来是一行灰色小字，现在换成带绿色强调的卡片——压缩中显示跳动的「正在压缩上下文…」，
  完成后显示「上下文已压缩 · 已压缩 N 条（约 X tokens）」，并可展开纯文本摘要。
- **绿色鲸鱼**：侧栏品牌位沿用官方鲸鱼轮廓，只把颜色换成本主题的微信绿。
- **当前会话**：主视图正在看的那个会话行会带绿色底色，并在时间后显示「当前」徽标。
- **当前工作区**：当前工作区的文件夹图标使用强调色。工作区行本身没有插件扩展点，无法再加背景或徽标。

## 安装

上架插件市场后：**插件 → 插件市场 → 主题**，搜索「微信」。

命令行安装：

```sh
dsh plugin --profile web add dsh-wechat-theme
```

然后刷新页面。插件启用期间主题生效；在**插件**页禁用它即可恢复宿主配色。在已打开的页面里重新启用
需要刷新一次，因为浏览器端模块是在页面启动时加载的。

## 实现方式

- `client.js` 在激活时调用一次 `ctx.theme.overrideTokens('dsh-wechat-theme', tokens)`，每个值都是
  `{ light, dark }` 成对提供，因此会跟随宿主的浅色/深色/跟随系统偏好。
- `sidebar.brand.mark` 以 `priority: -1` 覆盖官方图标，用官方鲸鱼路径绘制并填充主题的微信绿。鲸鱼是产品
  自身的标识，本插件只改颜色，不主张对图形的所有权。
- `sidebar.session.row.trailing` 加一个小徽标，只在主视图保留的那个会话行上渲染。
- `conversation.composer.dock` 加使用率状态点；它读的是宿主内置圆环用的同一个 `contextPressure`
  投影，所以两者同进同退。
- 为 `compaction` / `manual-compaction` 注册 `conversation.chat.node`（priority `-1`），用压缩卡片替换宿主那一行。

没有 Host 服务、没有网络请求、没有构建步骤、没有全局样式注入。配色与装饰都随插件一起释放，
禁用后精确恢复宿主原来的调色板。

## 兼容性

- DeepSeek Harness 0.2.x Web 客户端（需要 `ctx.theme.overrideTokens` 以及
  `sidebar.brand.mark` / `sidebar.session.row.trailing` / `conversation.composer.dock` 这几个插槽）。
- 无运行依赖；`react` 来自浏览器模块表。

## 已知限制

- 工作区行没有插件插槽，只能给文件夹图标上色。
- 气泡圆角由宿主组件控制，未 token 化。
- 宿主上下文圆环本身仍是单一 token 色；按使用率分级的是我们加的状态点。
- 压缩卡片覆盖了宿主原行，摘要按纯文本渲染，不走 Markdown。
- 第三方主题是 token 层，不会出现在**设置 → 外观**的选项里；请用插件的启用/禁用开关切换。

## 许可证

MIT
