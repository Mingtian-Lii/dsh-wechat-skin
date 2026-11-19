# dsh-wechat-theme

A WeChat-style theme for the DeepSeek Harness Web GUI. It is a client-side bundle: one theme-token
layer, three small slot decorations, and a compaction card, all removed when the plugin is disabled.

## Screenshots

![WeChat-style theme in light mode](https://raw.githubusercontent.com/Mingtia-Li/dsh-wechat-theme/master/assets/screenshots/light.png)

![WeChat-style theme in dark mode](https://raw.githubusercontent.com/Mingtia-Li/dsh-wechat-theme/master/assets/screenshots/dark.png)

![Context compaction card](https://raw.githubusercontent.com/Mingtia-Li/dsh-wechat-theme/master/assets/screenshots/compacted.png)

## What changes

- **Palette** — 27 `--dsw-*` tokens, one value per color scheme. Light: a soft gray chat canvas
  (`#ededed`), a darker session list (`#e2e2e2`), WeChat green accents (`#0a8f45`), a green circular send
  action (`#06a852`), green outgoing bubbles (`#95ec69`), and WeChat's muted blue-gray links (`#576b95`).
  Dark: `#111111` canvas, `#2f5f3f` bubbles, `#3ecf72` accents.
- **Legacy bridges** — five `--dsh-color-*` names that older plugins still read with hardcoded
  fallbacks. Defining them lets a stats line still using the old names follow the palette (when such a
  plugin is installed); the values are inert otherwise and nothing depends on them.
- **Context usage** — a small status dot beside the host's context meter: green below 70%, amber from
  70%, red from 90%, with a “Context used N%” tooltip. It reads the host's own `contextPressure`
  projection and renders nothing until that projection exists.
- **Deep-diving label** — the host's blue “deep diving” activity text (`--dsw-alias-label-deep-diving`) follows
  the green palette.
- **Compaction card** — the host's muted one-line compaction row is replaced by a green-accented card: a
  pulsing “Compacting context…” while it runs, and “Context compacted · N items (~X tokens)” with a
  plain-text summary toggle afterwards.
- **Green whale** — the sidebar brand mark keeps the shipped whale geometry and is painted with the theme
  green instead of the default ink color.
- **Current session** — the session row the main view currently shows gets a green wash and a
  “Current” (当前) badge after its time label.
- **Current workspace** — the active workspace folder uses the accent color. The workspace row itself has
  no plugin extension point, so no badge or background can be added there.

## Install

Once listed in the plugin market: **Plugins → Plugin Market → Themes**, search for “WeChat”.

From the CLI:

```sh
dsh plugin --profile web add dsh-wechat-theme
```

Then refresh the Web page. The theme applies while the plugin is enabled; disable it under **Plugins** to
return to the stock palette. Re-enabling it in an already-open page needs one refresh, because the
browser-side module is loaded at page boot.

## How it works

- `client.js` calls `ctx.theme.overrideTokens('dsh-wechat-theme', tokens)` once at activation. Every value
  is a `{ light, dark }` pair, so the theme follows the host's light/dark/system preference.
- `sidebar.brand.mark` is replaced at priority `-1` by an SVG that reuses the official whale path and paints
  it with the theme's brand green. The whale is the product's own mark — this plugin only recolors it and
  claims no ownership of the artwork.
- `sidebar.session.row.trailing` gets a small badge that renders only for the session retained by the main
  view.
- `conversation.composer.dock` gets the usage dot. It reads `useProjection('contextPressure')`, the same
  host projection the built-in meter uses, so it appears and disappears with that meter.
- `conversation.chat.node` registrations for `compaction` and `manual-compaction` replace the shipped rows
  with the compaction card (priority `-1`).

There is no Host service, no network request, no build step and no stylesheet injection. The palette and
the decorations are disposed with the plugin, which restores the host palette exactly.

## Compatibility

- DeepSeek Harness 0.2.x Web client (the versions that provide `ctx.theme.overrideTokens` and the
  `sidebar.brand.mark` / `sidebar.session.row.trailing` slots).
- No runtime dependencies; `react` is provided by the browser module table.

## Known limits

- The workspace row has no plugin slot, so only its folder icon can be themed.
- Bubble corner radius belongs to the host component and is not tokenized.
- The host's context meter keeps its single tokenized color; the colored usage level is our separate dot.
- The compaction card shadows the shipped row; its summary renders as plain text, not Markdown.
- Third-party themes are a token layer; they do not appear as an option in **Settings → Appearance**. Use the
  plugin's enable/disable switch instead.

## License

MIT
