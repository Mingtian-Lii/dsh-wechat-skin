/**
 * WeChat-style theme for the Harness Web GUI.
 *
 * The Client half registers one alias-token override layer on the active theme,
 * paints the sidebar whale green, marks the current Session in the sidebar, and
 * adds a usage-level dot beside the host's context meter. Palette values are CSS
 * colors only; the decorations use theme tokens and dispose with the plugin.
 */
const PACKAGE_ID = 'dsh-wechat-theme';
const LOCALE_NS = 'wechat-theme';

/**
 * WeChat-inspired palette: one value per color scheme.
 * Body and secondary text keep at least 4.5:1 contrast on the surfaces defined
 * here; accent-colored labels and icons keep at least 3:1.
 */
const TOKENS = {
  // Canvas and surfaces: WeChat's gray chat canvas, white cards, darker session list.
  '--dsw-alias-bg-base': { light: '#ededed', dark: '#111111' },
  '--dsw-alias-bg-layer-1': { light: '#ffffff', dark: '#191919' },
  '--dsw-alias-bg-layer-2': { light: '#ffffff', dark: '#202020' },
  '--dsw-alias-bg-overlay': { light: '#ffffff', dark: '#2a2a2a' },
  '--dsw-specific-sidebar-fill': { light: '#e2e2e2', dark: '#1c1c1c' },

  // WeChat ink hierarchy.
  '--dsw-alias-label-primary': { light: '#191919', dark: '#ececec' },
  '--dsw-alias-label-secondary': { light: '#595959', dark: '#aaaaaa' },
  '--dsw-alias-label-tertiary': { light: '#828282', dark: '#8a8a8a' },

  // Green accent for selection, tabs, focus, the active workspace folder, and iconography.
  '--dsw-alias-state-business-primary': { light: '#0a8f45', dark: '#3ecf72' },
  '--dsw-alias-state-business-tertiary': { light: '#d9f5e5', dark: '#16301f' },
  '--dsw-alias-brand-primary-new-colorprimary-new-color': { light: '#07c160', dark: '#3ecf72' },

  // The circular send action: WeChat green fill, white glyph.
  '--dsw-alias-button-info-fill': { light: '#06a852', dark: '#06a852' },
  '--dsw-alias-button-info-hover': { light: '#07c160', dark: '#07c160' },

  // The sidebar's New session call to action, and its hover.
  '--dsw-alias-button-elevated-fill': { light: '#07c160', dark: '#1f4d32' },
  '--dsw-alias-button-floating-hover': { light: '#06ad56', dark: '#276344' },

  // WeChat's classic muted blue-gray link color.
  '--dsw-alias-link': { light: '#576b95', dark: '#8fa4cc' },

  // Status colors, with WeChat green for success marks.
  '--dsw-alias-state-error-primary': { light: '#fa5151', dark: '#fa5151' },
  '--dsw-alias-state-warn-primary': { light: '#fa9d3b', dark: '#fa9d3b' },
  '--dsw-alias-state-idle-primary': { light: '#bdbdbd', dark: '#5c5c5c' },
  '--dsw-alias-state-success-primary': { light: '#0a8f45', dark: '#3ecf72' },

  // The host's "deep diving" activity label (blue by default) follows the theme.
  '--dsw-alias-label-deep-diving': { light: '#0a8f45', dark: '#3ecf72' },
  '--dsw-alias-label-deep-diving-shimmer': { light: '#95ec69', dark: '#4ade80' },

  // Chat bubbles: WeChat's outgoing green in light, deep green in dark.
  '--dsw-specific-bubble': { light: '#95ec69', dark: '#2f5f3f' },
  '--dsw-specific-bubble-highlight': { light: '#7fe04f', dark: '#3a7048' },

  // Green hover/active washes: session and workspace rows read green when selected.
  '--dsw-alias-interactive-bg-hover': { light: '#07c16033', dark: '#3ecf7240' },
  '--dsw-alias-interactive-bg-active': { light: '#07c16042', dark: '#3ecf724d' },
  '--dsw-alias-markdown-citation': { light: '#e2e2e2', dark: '#202020' },

  // Legacy bridge names. Plugins built against older DSH releases still read
  // these with hardcoded fallbacks (a gray stats line, a blue cost figure);
  // defining them here makes those widgets follow the same palette without
  // touching their code.
  '--dsh-color-text': {
    light: 'var(--dsw-alias-label-primary)',
    dark: 'var(--dsw-alias-label-primary)',
  },
  '--dsh-color-text-secondary': {
    light: 'var(--dsw-alias-label-secondary)',
    dark: 'var(--dsw-alias-label-secondary)',
  },
  '--dsh-color-accent': {
    light: 'var(--dsw-alias-state-business-primary)',
    dark: 'var(--dsw-alias-state-business-primary)',
  },
  '--dsh-color-surface': {
    light: 'var(--dsw-alias-bg-layer-1)',
    dark: 'var(--dsw-alias-bg-layer-1)',
  },
  '--dsh-color-surface-overlay': {
    light: 'var(--dsw-alias-bg-layer-2)',
    dark: 'var(--dsw-alias-bg-layer-2)',
  },
};

/**
 * The product whale, drawn from the shipped 23.16 x 17.04 logo geometry so the
 * sidebar mark keeps its exact shape while adopting WeChat green.
 */
const FISH_VIEWBOX = { width: 23.16, height: 17.04 };
const FISH_PATH = "M22.9168 1.43018C22.6713 1.31018 22.5658 1.53918 22.4223 1.65519C22.3733 1.69269 22.3318 1.74169 22.2903 1.78669C21.9317 2.1697 21.5127 2.42121 20.9657 2.39121C20.1657 2.34621 19.4827 2.59771 18.8787 3.20973C18.7502 2.45521 18.3236 2.0047 17.6746 1.71569C17.3351 1.56568 16.9916 1.41518 16.7536 1.08867C16.5876 0.856163 16.5421 0.597155 16.4591 0.341647C16.4061 0.187643 16.3536 0.0301382 16.1761 0.00363739C15.9836 -0.0263635 15.9081 0.135141 15.8326 0.270145C15.5306 0.822162 15.4136 1.43018 15.4251 2.0462C15.4516 3.43174 16.0366 4.53527 17.1991 5.3203C17.3311 5.4103 17.3651 5.5003 17.3236 5.63181C17.2441 5.90231 17.1501 6.16482 17.0671 6.43533C17.0141 6.60784 16.9351 6.64584 16.7501 6.57033C16.1121 6.30383 15.5611 5.90931 15.074 5.4328C14.2475 4.63328 13.5 3.75075 12.568 3.05973C12.349 2.89822 12.13 2.74822 11.9034 2.60522C10.9524 1.68169 12.028 0.923165 12.277 0.833162C12.5375 0.739159 12.3675 0.41615 11.5259 0.42015C10.6844 0.42365 9.91439 0.705658 8.93286 1.08117C8.78935 1.13767 8.63835 1.17867 8.48384 1.21267C7.59332 1.04367 6.66829 1.00617 5.70226 1.11517C3.88321 1.31768 2.43016 2.1777 1.36213 3.64575C0.0790928 5.4103 -0.222916 7.41536 0.146595 9.50642C0.535106 11.7105 1.66014 13.535 3.38869 14.9616C5.18125 16.4406 7.24581 17.1657 9.60138 17.0266C11.0319 16.9441 12.6245 16.7526 14.421 15.2321C14.874 15.4576 15.3496 15.5476 16.1381 15.6151C16.7456 15.6716 17.3306 15.5851 17.7836 15.4911C18.4931 15.3411 18.4441 14.6841 18.1876 14.5636C16.1081 13.595 16.5646 13.9891 16.1496 13.67C17.2061 12.42 18.8202 10.1979 19.3182 7.17235C19.3672 6.83834 19.4297 6.36783 19.4222 6.09732C19.4182 5.93231 19.4562 5.86831 19.6447 5.84931C20.1657 5.78931 20.6712 5.64681 21.1357 5.3913C22.4833 4.65528 23.0268 3.44624 23.1548 1.9972C23.1738 1.77569 23.1508 1.54668 22.9168 1.43018ZM11.1749 14.4736C9.15936 12.889 8.18184 12.3675 7.77832 12.39C7.40081 12.4125 7.46881 12.8445 7.55182 13.126C7.63882 13.404 7.75182 13.5955 7.91033 13.8396C8.01983 14.0011 8.09533 14.2411 7.80083 14.4216C7.15181 14.8231 6.02327 14.2866 5.97027 14.2601C4.65673 13.4865 3.5587 12.4655 2.78467 11.069C2.03715 9.72493 1.60314 8.28289 1.53164 6.74384C1.51264 6.37233 1.62214 6.24082 1.99215 6.17332C2.47916 6.08332 2.98118 6.06432 3.46769 6.13582C5.52476 6.43633 7.27581 7.35586 8.74385 8.8129C9.58188 9.64243 10.2159 10.634 10.8689 11.6025C11.5634 12.631 12.3105 13.611 13.262 14.4146C13.598 14.6961 13.866 14.9101 14.1225 15.0681C13.349 15.1546 12.058 15.1731 11.1749 14.4746L11.1749 14.4736ZM12.141 8.25988C12.141 8.09488 12.273 7.96338 12.439 7.96338C12.4765 7.96338 12.5105 7.97088 12.541 7.98188C12.5825 7.99688 12.6205 8.01938 12.6505 8.05338C12.7035 8.10588 12.7335 8.18088 12.7335 8.25988C12.7335 8.42489 12.6015 8.55639 12.4355 8.55639C12.2695 8.55639 12.141 8.42489 12.141 8.25988ZM15.1415 9.79893C14.949 9.87793 14.7565 9.94544 14.5715 9.95294C14.2845 9.96794 13.9715 9.85143 13.8015 9.70893C13.5375 9.48742 13.3485 9.36342 13.2695 8.97691C13.2355 8.8119 13.2545 8.55639 13.2845 8.40989C13.3525 8.09438 13.277 7.89187 13.0545 7.70787C12.8735 7.55786 12.643 7.51636 12.39 7.51636C12.2955 7.51636 12.209 7.47486 12.1445 7.44136C12.039 7.38886 11.9519 7.25735 12.035 7.09585C12.0615 7.04335 12.19 6.91584 12.22 6.89334C12.5635 6.69784 12.9595 6.76184 13.326 6.90834C13.6655 7.04735 13.9225 7.30236 14.292 7.66287C14.6695 8.09838 14.7375 8.21838 14.9525 8.54539C15.1225 8.8009 15.277 9.06341 15.3831 9.36392C15.4471 9.55142 15.3641 9.70493 15.1415 9.79893Z";

const EN = {
  current: 'Current',
  contextLevel: 'Context used {percent}%',
  compactionRunning: 'Compacting context…',
  compactionDone: 'Context compacted',
  compactionCounts: 'Compacted {items} items (~{tokens} tokens)',
  compactionExpand: 'Show summary',
  compactionCollapse: 'Hide summary',
  compactionUnavailable: 'Compaction summary unavailable',
  compactionFailed: 'Compaction failed',
  compactionDoneShort: 'Done',
};
const ZH = {
  current: '当前',
  contextLevel: '上下文已用 {percent}%',
  compactionRunning: '正在压缩上下文…',
  compactionDone: '上下文已压缩',
  compactionCounts: '已压缩 {items} 条历史记录（约 {tokens} tokens）',
  compactionExpand: '查看压缩摘要',
  compactionCollapse: '收起摘要',
  compactionUnavailable: '压缩摘要不可用',
  compactionFailed: '压缩失败',
  compactionDoneShort: '已完成',
};

window.__ModuleLoader__.load({
  id: PACKAGE_ID,
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    /** The official whale mark, tinted with the theme's WeChat green. */
    function GreenWhaleMark({ size = 24 }) {
      return h(
        'svg',
        {
          width: size,
          height: (size * FISH_VIEWBOX.height) / FISH_VIEWBOX.width,
          viewBox: `0 0 ${FISH_VIEWBOX.width} ${FISH_VIEWBOX.height}`,
          fill: 'none',
          'aria-hidden': true,
          style: { display: 'block' },
        },
        h('path', {
          d: FISH_PATH,
          fill: 'var(--dsw-alias-brand-primary-new-colorprimary-new-color, #07c160)',
        }),
      );
    }

    /** A compact green badge on the Session row the main view currently shows. */
    function CurrentSessionMark({ sessionId, useSessions, t }) {
      const isCurrent = useSessions(
        (list) => (list?.byId?.[sessionId]?.retainedBy?.mainView ?? 0) > 0,
      );
      if (!isCurrent) return null;
      const label = typeof t === 'function' ? t('current') : 'Current';
      return h(
        'span',
        {
          title: label,
          'aria-label': label,
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
            flex: 'none',
            height: '16px',
            padding: '0 5px',
            borderRadius: '4px',
            background: 'var(--dsw-alias-state-business-tertiary)',
            color: 'var(--dsw-alias-label-primary)',
            fontSize: '10px',
            lineHeight: '16px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          },
        },
        h('span', {
          'aria-hidden': true,
          style: {
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            flex: 'none',
            background: 'var(--dsw-alias-state-business-primary)',
          },
        }),
        label,
      );
    }

    /**
     * A usage-level dot beside the host's context meter: green below 70%,
     * amber from 70%, red from 90%. It reads the host's own `contextPressure`
     * projection and renders nothing until that projection exists.
     */
    function ContextLevelDot({ useProjection, t }) {
      const pressure =
        typeof useProjection === 'function' ? useProjection('contextPressure') : undefined;
      const used = pressure?.projectedTokens ?? pressure?.pressureTokens;
      const total = pressure?.contextWindow;
      if (typeof used !== 'number' || typeof total !== 'number' || total <= 0) return null;
      const percent = Math.min(100, Math.round((used / total) * 100));
      const tone = percent >= 90 ? 'error' : percent >= 70 ? 'warn' : 'success';
      const label =
        typeof t === 'function' ? t('contextLevel', { percent }) : `Context used ${percent}%`;
      return h(
        'span',
        {
          title: label,
          'aria-label': label,
          style: {
            display: 'inline-flex',
            alignItems: 'center',
            flex: 'none',
            padding: '0 2px',
          },
        },
        h('span', {
          'aria-hidden': true,
          style: {
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: `var(--dsw-alias-state-${tone}-primary)`,
          },
        }),
      );
    }

    /**
     * A prominent compaction card for the `compaction` and `manual-compaction`
     * Chat rows: pale green surface, accent bar, bold status. The shipped rows
     * are muted one-liners; this version is meant to be noticed while the
     * context is being compacted.
     */
    function CompactionView({ node, t }) {
      const [open, setOpen] = React.useState(false);
      const label = (key, params) => (typeof t === 'function' ? t(key, params) : key);
      const data = node?.data ?? {};
      const manual = node?.kind === 'manual-compaction';
      const item = manual ? (data.compaction ?? null) : data;
      const command = manual ? data.command : undefined;
      const hasItem = item !== null && typeof item === 'object';
      const summary = hasItem && typeof item.summary === 'string' ? item.summary : null;
      const items =
        hasItem && typeof item.shadowedItemCount === 'number' ? item.shadowedItemCount : null;
      const tokens =
        hasItem && typeof item.shadowedTokenCount === 'number' ? item.shadowedTokenCount : null;
      const commandName = typeof command?.name === 'string' ? command.name : 'compact';
      const outcome = command?.outcome ?? null;
      const outcomeText = typeof outcome?.text === 'string' ? outcome.text : null;
      const running = !hasItem && manual && outcome === null;

      const card = {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        margin: '2px 0',
        padding: '7px 10px 7px 12px',
        borderRadius: '8px',
        background: 'var(--dsw-alias-state-business-tertiary)',
        borderLeft: '3px solid var(--dsw-alias-state-business-primary)',
      };
      const head = { display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 };
      const dot = {
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        flex: 'none',
        background: 'var(--dsw-alias-state-business-primary)',
      };
      const title = {
        fontSize: '13px',
        fontWeight: 600,
        color: 'var(--dsw-alias-label-primary)',
      };
      const detail = { fontSize: '12px', color: 'var(--dsw-alias-label-secondary)' };
      const toggle = {
        marginLeft: 'auto',
        padding: 0,
        border: 'none',
        background: 'none',
        color: 'var(--dsw-alias-state-business-primary)',
        font: 'inherit',
        fontSize: '11px',
        cursor: 'pointer',
      };

      if (running) {
        return h(
          'div',
          { style: card, role: 'status', 'aria-live': 'polite' },
          h(
            'style',
            null,
            '@keyframes wechat-compaction-pulse{0%,100%{opacity:1}50%{opacity:.35}}',
          ),
          h(
            'div',
            { style: head },
            h('span', {
              'aria-hidden': true,
              style: { ...dot, animation: 'wechat-compaction-pulse 1.1s ease-in-out infinite' },
            }),
            h('span', { style: title }, label('compactionRunning')),
          ),
          h('span', { style: detail }, commandName),
        );
      }

      if (!hasItem) {
        return h(
          'div',
          { style: card },
          h(
            'div',
            { style: head },
            h('span', { 'aria-hidden': true, style: dot }),
            h('span', { style: title }, commandName),
          ),
          h(
            'span',
            {
              style: {
                ...detail,
                color:
                  outcome?.kind === 'error'
                    ? 'var(--dsw-alias-state-error-primary)'
                    : detail.color,
              },
            },
            outcomeText ??
              (outcome?.kind === 'error'
                ? label('compactionFailed')
                : label('compactionDoneShort')),
          ),
        );
      }

      const counts =
        items !== null && tokens !== null
          ? label('compactionCounts', { items, tokens })
          : summary === null
            ? label('compactionUnavailable')
            : null;
      return h(
        'div',
        { style: card },
        h(
          'div',
          { style: head },
          h('span', { 'aria-hidden': true, style: dot }),
          h('span', { style: title }, label('compactionDone')),
          summary !== null &&
            h(
              'button',
              {
                type: 'button',
                style: toggle,
                'aria-expanded': open,
                onClick: () => setOpen((value) => !value),
              },
              open ? label('compactionCollapse') : label('compactionExpand'),
            ),
        ),
        counts !== null && h('span', { style: detail }, counts),
        open &&
          summary !== null &&
          h(
            'div',
            {
              style: {
                marginTop: '4px',
                maxHeight: '180px',
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                fontSize: '12px',
                lineHeight: '18px',
                color: 'var(--dsw-alias-label-secondary)',
              },
            },
            summary,
          ),
      );
    }

    return {
      inject: ['theme', 'slots', 'locale'],
      apply(ctx) {
        ctx.effect(
          () => ctx.theme.overrideTokens(PACKAGE_ID, TOKENS),
          'wechat-theme: palette layer',
        );
        ctx.effect(
          () => ctx.locale.register(LOCALE_NS, 'en', EN),
          'wechat-theme: en locale',
        );
        ctx.effect(
          () => ctx.locale.register(LOCALE_NS, 'zh', ZH),
          'wechat-theme: zh locale',
        );
        ctx.slots.inject('sidebar.brand.mark', () =>
          ctx.slots.register(
            // The shipped official mark registers at priority 0; the lowest
            // priority renders, so a negative priority is what shadows it.
            { name: 'sidebar.brand.mark', priority: -1 },
            GreenWhaleMark,
          ),
        );
        ctx.slots.inject('sidebar.session.row.trailing', () =>
          ctx.slots.register(
            {
              name: 'sidebar.session.row.trailing',
              id: 'wechat-current-session',
              order: 15,
              locale: LOCALE_NS,
            },
            CurrentSessionMark,
          ),
        );
        ctx.slots.inject('conversation.composer.dock', () =>
          ctx.slots.register(
            {
              name: 'conversation.composer.dock',
              id: 'wechat-context-level',
              order: 2,
              locale: LOCALE_NS,
            },
            ContextLevelDot,
          ),
        );
        for (const key of ['compaction', 'manual-compaction']) {
          ctx.slots.inject('conversation.chat.node', () =>
            ctx.slots.register(
              {
                name: 'conversation.chat.node',
                key,
                priority: -1,
                locale: LOCALE_NS,
              },
              CompactionView,
            ),
          );
        }
      },
    };
  },
});
