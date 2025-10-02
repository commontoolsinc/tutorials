---
title: Common UI
short_title: Common UI
description: Introduction to Common UI
subject: Tutorial
authors:
  - name: Ben Follington
    email: ben@common.tools
keywords: commontools, UI
abstract: |
Common UI is a collection of web components (prefixed with ct-) exposed for building patterns.
---

- layout components: `ct-autolayout`, `ct-screen`, `ct-vstack`, `ct-hstack`, `ct-vscroll`, `ct-toolbar`, `ct-grid` (stale)
	- gap: `ct-zstack` for layered rendering
	- gap: `ct-spacer` (distinct from `ct-separator`)

```tsx
<ct-theme override={}>
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
</ct-theme>
```

- meta: `ct-theme`, `ct-render`, `ct-keybind`

- typesetting: `ct-label`, `ct-heading`
	- gap: `ct-text` for themed paragraph usecase (`p` works)
	- <p>, <Text>

- gap: `ct-icon` (and `ct-label` has an optional in-built icon)
    - gap: icon set?

- input: `ct-button`, `ct-select`, `ct-input`, `ct-textarea`, `ct-checkbox`, `ct-tags`
	- gap: `ct-search` which has an autocomplete menu
	- gap: `ct-file-picker`
	- redundant: common-send-message, ct-message-input (?)
	    - this is JUST a button and an input
		- the "right" way is:
      - ```tsx
        <ct-form onSubmit={handler({ ... })}>
          <ct-input></ct-input>
          <ct-button type="submit">Submit</ct-button>
        </ct-form>
        ```

      - ```tsx
        const EnterToSubmit = recipe(({ myHandler }) => {
          return {
              [UI]: <ct-form onSubmit={myHandler}>
                <ct-input></ct-input>
                <ct-button type="submit">Submit</ct-button>
              </ct-form>
          }
        })

        <EnterToSubmit myHandler={...} />
      ```

- interactive: `ct-collapsible`, `ct-list-item`, `ct-tab-list`, `ct-canvas`
    - `type ListItem = { title: string }`
    - `const items: ListItem[]`
    - Consider using `[NAME]`?
	- gap: re-orderable list
      - ```tsx
        <ct-list editable reorderable onDelete={}>
            {items.map((i: Opaque<{ name: string }>) => <ct-list-item>{i.name}</ct-list-item>)}
        </ct-list>
        ```
    - `editable` only applies to the `title` property of each list item

- complex/integrated (cell interop): `ct-code-editor`, `ct-outliner`, `ct-list`
	- gap: editable table rows

- chat: `ct-chat`, `ct-prompt-input`, `ct-chat-message`, `ct-tool-call`, `ct-tools-chip`
- visual: `ct-kdb`, `ct-separator`, `ct-table`, `ct-tool-call`
	- gap: `ct-img` or `ct-media`


- stale: `ct-aspect-ratio`, `ct-draggable`, `ct-form`, `ct-grid`, `ct-hgroup`, `ct-input-otp`, `ct-message-input`, `ct-progress`, `ct-radio`, `ct-radio-group`, `ct-slider`, `ct-switch`, `ct-tile`, `ct-toggle`, `ct-toggle-group`, `ct-vgroup`
- superfluous: `ct-resizeable-handle`, `ct-resizable-panel`, `ct-resizeable-panel-group`, `ct-scroll-area`, `ct-tabs`/`ct-tab-list`/`ct-tab-panel`
