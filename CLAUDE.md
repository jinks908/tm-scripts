# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a collection of Tampermonkey/Greasemonkey userscripts that enhance various websites with custom themes, improved functionality, and better user experiences. Scripts are primarily focused on dark themes and keyboard shortcuts for popular websites.

## Project Structure

**Userscript Files** (`.user.js`)
- Each script is a standalone userscript with metadata headers (`@name`, `@namespace`, `@version`, etc.)
- Scripts follow naming convention: `Site_Feature.user.js` (e.g., `YouTube_Playlist.user.js`)
- Main categories:
  - Reading/Content: `Gutenberg_Styles`, `Wiki_Scripts`, `Medium_Dark_Theme`, `All_Poetry_Theme`, `Algorithmica`
  - Productivity: `Notion_Dark_Theme`, `YouTube_Ask_AI`, `Amazon_Styles`, `NatGeo_Styles`
  - Media: `Everand_Playback`, `Everand_Dark_Mode`
  - Utilities: `macOSicons`, `Global_Theme`

**Debug Variants**
- Some scripts have `DEBUG_` prefixed versions for development/testing
- Set `DEBUG = true` in scripts to enable debug features (e.g., Everand_Playback exposes `everandDebug` object)

**Supporting Files**
- `data.json`: Debug/development data (not production code)
- `youtube_js_functions.js` / `youtube_js_functions_excerpt.js`: Helper functions for YouTube scripts
- `test.js`: Testing utilities
- `TODO.md`: Planned features and enhancements

## Design Philosophy & Patterns

### Color Scheme
Scripts use a consistent dark theme palette defined via CSS variables:
```css
--tpr-default: #e3dede    /* Main text */
--tpr-bg: #0c1621         /* Background */
--tpr-bg-alt: #111f2e     /* Alternate background */
--tpr-seafoam: #52e3c3    /* Primary accent */
--tpr-skyblue: #9ec6ea    /* Secondary accent */
--tpr-orange: #fc8530
--tpr-yellow: #fec339
```

### Font System
- Main font: `Quicksand Light`
- Headers: `Poppins`
- Code: `DroidSansMono`

### Script Architecture Patterns

**1. Style Injection Pattern** (e.g., Notion_Dark_Theme.user.js)
- Use `GM_addStyle()` to inject CSS
- Structure CSS with commented sections: Colors, UI Elements, Fonts, Page Design
- Override inline styles with `!important` where necessary
- Use attribute selectors to target Notion's dynamic styling: `[style*="color:rgba(...)"]`

**2. DOM Manipulation Pattern** (e.g., YouTube_Playlist.user.js)
- Use MutationObserver to watch for dynamic content
- Store references to modified elements in script-level variables
- Override native methods (e.g., `dropdown.close`) and preserve originals as `_original*`
- Clean up observers when no longer needed

**3. Media Control Pattern** (e.g., Everand_Playback.user.js)
- Direct `<audio>` element manipulation via `document.querySelector('audio')`
- Keyboard event handlers with `e.preventDefault()` and input/textarea exclusions
- Visual feedback via temporary floating indicators (`showIndicator()`)
- Periodic sync intervals to maintain state consistency

**4. Feature Injection Pattern** (e.g., Notion "Back to Top" button)
- Create elements programmatically
- Inject into specific DOM locations after page load
- Re-inject on SPA navigation using MutationObserver

## Userscript Metadata Headers

All scripts require these metadata fields:
```javascript
// ==UserScript==
// @name         Script Name
// @namespace    SkyColtNinja/userscripts
// @version      X.Y.Z
// @updateURL    https://raw.githubusercontent.com/jinks908/tm-scripts/main/Script_Name.user.js
// @downloadURL  https://raw.githubusercontent.com/jinks908/tm-scripts/main/Script_Name.user.js
// @description  Brief description
// @author       SkyColtNinja (or Clayton Jinks)
// @match        https://example.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_addStyle (or 'none' if no GM functions used)
// ==/UserScript==
```

## Keyboard Shortcuts Patterns

When implementing keyboard shortcuts:
- Check `e.target.tagName` to exclude `INPUT` and `TEXTAREA`
- Use `e.preventDefault()` to prevent default browser behavior
- Use `true` capture phase for event listeners: `addEventListener('keydown', handler, true)`
- Handle both `keydown` and `keyup` when overriding site defaults

Example from Everand_Playback.user.js:
- `>` / `<`: Playback speed adjustment
- `=`: Reset speed to 1.0x
- `↑` / `↓`: Volume control
- `k`: Play/pause
- `j` / `l`: Skip backward/forward
- `0-9`: Jump to sections

## Common Development Tasks

### Creating a New Theme Script
1. Start with the standard userscript header
2. Use `GM_addStyle()` with CSS template literal
3. Define CSS variables in `:root` for colors/fonts
4. Group styles by function (colors, fonts, UI elements)
5. Use consistent naming: `--tpr-*` for custom properties

### Adding Dynamic Features
1. Wrap code in IIFE: `(function() { 'use strict'; ... })()`
2. Use `document.readyState` check for initialization timing
3. Employ MutationObserver for watching DOM changes
4. Store cleanup references (observers, modified elements)

### Debugging
1. Set `DEBUG = true` at script top
2. Expose debug interface: `unsafeWindow.scriptDebug = { ... }`
3. Use `console.log()` with descriptive prefixes
4. Create debug variants with `DEBUG_` prefix for testing

## Git Workflow

Repository uses simple git workflow:
- Main branch: `main`
- Commit style: Imperative mood (e.g., "Add: feature", "Fix: bug", "Update: improvement")
- Recent commits show "Minor changes" for small updates

## Distribution

Scripts are distributed via raw GitHub URLs:
- Update URL: `https://raw.githubusercontent.com/jinks908/tm-scripts/main/Script_Name.user.js`
- Users install through Tampermonkey/Greasemonkey by opening raw file URLs
- Version bumps in metadata trigger auto-updates in userscript managers

## Special Considerations

**Notion Scripts**: Must handle SPA navigation and dynamic theme switching. The app uses CSS variables (`--c-*`) that need overriding.

**YouTube Scripts**: YouTube's Polymer-based UI uses custom elements (`tp-yt-iron-dropdown`, `yt-list-item-view-model`). Scripts must handle SPA navigation and dynamic menu creation.

**Everand Scripts**: Audio player state management requires periodic synchronization since playback speed can be changed via UI controls.

**Site-Specific Selectors**: When sites update their DOM structure, scripts may break. Keep selectors as resilient as possible (prefer stable attributes over fragile class names).
