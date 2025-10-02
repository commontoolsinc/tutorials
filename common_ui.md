---
title: Common UI
short_title: Common UI
description: Desc about Common UI
subject: Tutorial
authors:
  - name:
    email:
keywords: commontools, UI
abstract: |
  Something here.
---

- layout components: ct-autolayout, ct-screen, ct-vstack, ct-hstack, ct-vscroll, ct-toolbar, ct-grid (stale)
	- gap: `ct-zstack` for layered rendering
	- gap: `ct-spacer` (distinct from `ct-separator`)

<ct-vstack>
    <ct-hstack gap="sm">
        <icon>question</icon>
        <button>hello</button>
        <ct-spacer />
        <button>hello</button>
    </ct-hstack>

    <ct-hstack gap="sm">
        <icon>question</icon>
        <button>hello</button>
    </ct-hstack>
</ct-vstack>


- meta: ct-theme, ct-render, ct-keybind

- typesetting: ct-label, ct-heading
	- gap: `ct-text` for themed paragraph usecase (`p` works)

- gap: `ct-icon` (and `ct-label` has an optional in-built icon)

- input: ct-button, ct-select, ct-input, ct-textarea, ct-checkbox, ct-tags
	- gap: `ct-search` which has an autocomplete menu
	- gap: `ct-file-picker`

- interactive: ct-collapsible, ct-list-item, ct-tab-list, ct-canvas
	- gap: re-orderable list

- complex/integrated (cell interop): ct-code-editor, ct-outliner, ct-list
	- gap: editable table rows

- chat: ct-chat, ct-prompt-input, ct-chat-message, ct-tool-call, ct-tools-chip
- visual: ct-kdb, ct-separator, ct-table, ct-tool-call
	- gap: `ct-img` or `ct-media`


- stale: ct-aspect-ratio, ct-draggable, ct-form, ct-grid, ct-hgroup, ct-input-otp, ct-message-input, ct-progress, ct-radio, ct-radio-group, ct-slider, ct-switch, ct-tile, ct-toggle, ct-toggle-group, ct-vgroup
- superfluous: ct-resizeable-handle, ct-resizable-panel, ct-resizeable-panel-group, ct-scroll-area, ct-tabs/ct-tab-list/ct-tab-panel

SwiftUI: https://medium.com/@nsuneelkumar98/essential-swiftui-components-every-developer-should-know-2cd5d22b5d3b
