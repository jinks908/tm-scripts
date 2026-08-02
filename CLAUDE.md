# CLAUDE.md

**IMPORTANT GUIDELINES**

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```
## 5. Check for Existing References First

**Avoid re-reading the same file(s) multiple times.**

- Before pulling a file into the conversation from scratch with a `Read` call, first check
  if a copy already exists in the conversation/context. If it does, reference that copy
  instead of re-reading the file.
- Only pull a fresh file if that file has been modified since it was last read.

---

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a collection of userscripts (browser extensions) that enhance various websites with custom themes, features, and keyboard shortcuts. The scripts are written in vanilla JavaScript and use the Greasemonkey/Tampermonkey/Violentmonkey userscript APIs.

## Userscript Structure

All userscripts follow the standard Greasemonkey format:

```javascript
// ==UserScript==
// @name         Script Name
// @namespace    SkyColtNinja/userscripts
// @version      X.Y.Z
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/ScriptName.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/ScriptName.user.js
// @description  Description
// @author       SkyColtNinja
// @match        https://example.com/*
// @grant        GM_addStyle
// ==/UserScript==
```

### Key Metadata Fields

- `@match`: Specifies which URLs the script runs on
- `@grant`: Permissions (most scripts use `GM_addStyle` for CSS injection, some use `none`)
- `@run-at`: Controls when the script executes (`document-start`, `document-idle`, etc.)
- `@updateURL` and `@downloadURL`: Point to the raw GitHub file for auto-updates

## Common Patterns

### Dark Mode Implementation

Several scripts implement custom dark modes (Everand, Notion). The typical pattern:

1. Remove/block default dark mode stylesheets
2. Use `MutationObserver` to watch for and remove dynamically injected dark mode styles
3. Apply custom CSS via `GM_addStyle()` with CSS custom properties for theming

Example from `Everand_Dark_Mode.user.js:19-28`:
```javascript
function removeDarkStyle() {
    document.querySelectorAll('link[href*="dark_6.css"]').forEach(el => el.remove());
}
const observer = new MutationObserver(removeDarkStyle);
observer.observe(document.documentElement, { childList: true, subtree: true });
```

### Keyboard Shortcuts

Many scripts add custom keyboard shortcuts (YouTube Player, Everand Playback, Claude AI). The pattern:

1. Listen for `keydown` events (often with `capture: true` for early interception)
2. Check for specific key combinations using `e.key`, `e.metaKey`, `e.shiftKey`, `e.ctrlKey`
3. Use `e.preventDefault()` and `e.stopPropagation()` to block default behaviors
4. For scripts that need to run before page scripts, use `@run-at document-start`

### Visual Feedback

Scripts with user interactions often show temporary indicators. Common pattern:
- Create/reuse a positioned overlay element
- Display feedback (e.g., "1.5x speed", "75% volume")
- Auto-hide after a timeout

### Waiting for Elements

When elements aren't immediately available at script execution, use `waitForElement()`:

```javascript
function waitForElement(selector) {
    return new Promise((resolve) => {
        const el = document.querySelector(selector);
        if (el) { resolve(el); return; };

        const observer = new MutationObserver(() => {
            const el = document.querySelector(selector);
            if (el) {
                observer.disconnect();
                resolve(el);
            };
        });
        observer.observe(document.body, { childList: true, subtree: true });
    });
}
```

## Script Categories

### Media Players
- **YouTube_Player.user.js**: Enhanced video controls, volume boosting, custom keybindings
- **Everand_Playback.user.js**: Enhanced audiobook controls with keyboard shortcuts
- **Nebula_Player.user.js**: Enhancements for Nebula streaming platform

### Dark Modes
- **Everand_Dark_Mode.user.js**: Custom dark theme for Everand audio player
- **Notion_Dark_Theme.user.js**: Dark mode for Notion

### UI Enhancements
- **YouTube_Playlist.user.js**: Keep playlist menu open while selecting videos
- **Claude_AI.user.js**: Modify keybindings (blocks Enter for send, requires Ctrl+Enter)
- **Desmos.user.js**: Toggle dark mode on Desmos graphing calculator
- **Global_Theme.user.js**: Global selection colors and minor tweaks across all sites

## Development Notes

### Testing Scripts
- Install in a userscript manager (Violentmonkey/Tampermonkey)
- Navigate to the matching URL
- Check browser console for errors
- Debug mode is available in some scripts (e.g., `Everand_Playback.user.js:18` has `let DEBUG = false`)

### Version Numbering
- Format: `X.Y.Z` or `X.Y.Z-stable`
- Increment when making changes so users get auto-updates

### Event Listener Patterns
- Use `capture: true` when you need to intercept events before page scripts
- Use `stopImmediatePropagation()` to prevent other listeners (including page's own) from running
- For `@run-at document-start`, listeners are added before page scripts load

### DOM Manipulation Safety
- Always check if elements exist before manipulating them
- Use `waitForElement()` for elements that load dynamically
- Use `MutationObserver` to watch for dynamic content changes

## Helper Files

- `youtube_js_functions.js`: Extracted/minified YouTube code (reference only)
- `youtube_js_functions_excerpt.js`: Code excerpts for development reference
- `test.js`: Testing/development file

## Distribution

Scripts are hosted on GitHub and use `@updateURL` / `@downloadURL` pointing to:
```
https://raw.githubusercontent.com/jinks908/tm-scripts/main/[ScriptName].user.js
```

Users install by clicking the raw GitHub file, which triggers their userscript manager.
