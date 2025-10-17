# Userscripts Collection

A curated collection of custom userscripts for enhancing various websites with improved themes, functionality, and user experience.

## 📋 Overview

This repository contains Tampermonkey/Greasemonkey userscripts that provide custom styling, enhanced functionality, and quality-of-life improvements for popular websites. All scripts are designed to improve readability, aesthetics, and usability.

## 🎨 Featured Scripts

### Reading & Content

- **Gutenberg Styles** - Custom dark theme with enhanced typography for Project Gutenberg
- **Wiki Theme** & **Wiki Reader Theme** - Clean, distraction-free Wikipedia reading experience with dark mode
- **Wiki Popup Hider** - Removes Wikipedia popups when using Tridactyl hints
- **Medium Dark Theme** - Comfortable dark theme for Medium articles
- **All Poetry Theme** - Dark mode corrections for AllPoetry.com
- **Algorithmica Theme** - Custom theme with syntax highlighting for Algorithmica

### Productivity & Tools

- **Notion Dark Theme** - Comprehensive dark theme with custom colors, fonts, and a "Back to Top" button
- **YouTube Ask AI** - Keyboard shortcut (Ctrl+A) to quickly access YouTube's Ask AI feature
- **Workona Suspend All** - Automatically suspends all non-active tabs in Workona
- **Amazon Styles** - Fixes for dark mode on Amazon
- **National Geographic Styles** - Removes paywall popups

### Media & Entertainment

- **Everand Playback** - Enhanced audiobook controls with keyboard shortcuts:
  - `>` / `<` - Adjust playback speed
  - `=` - Reset to 1.0x speed
  - `↑` / `↓` - Adjust volume
  - `k` - Play/pause
  - `j` / `l` - Skip backward/forward 15 seconds
  - `0-9` - Jump to specific sections of current track
- **Everand Dark Mode** - Custom dark theme for the Everand audio player

### Utilities

- **OpenAI Theme** - Custom colors and styles for ChatGPT
- **macOSicons** - Removes sticky banner on macOSicons.com
- **Global Theme** - Global selection color styling for Firefox

## 🚀 Installation

1. Install a userscript manager:
   - [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Firefox, Safari, Edge)
   - [Greasemonkey](https://www.greasespot.net/) (Firefox)
   - [Violentmonkey](https://violentmonkey.github.io/) (Chrome, Firefox, Edge)

2. Click on any script file in this repository

3. Click the "Raw" button to view the raw script

4. Your userscript manager should automatically prompt you to install it

5. Click "Install" to add the script

## 🎨 Design Philosophy

These scripts follow several design principles:

- **Dark Mode First** - Most themes use a dark color palette (`#0c1621` background with `#e3dede` text)
- **Consistent Color Scheme** - Recurring accent colors across themes:
  - Seafoam green: `#52e3c3`
  - Sky blue: `#9ec6ea`
  - Orange: `#fc8530`
  - Yellow: `#fec339`
- **Enhanced Typography** - Custom fonts (Quicksand, Poppins, Cormorant) for better readability
- **Minimal Interference** - Scripts only apply where needed, avoiding conflicts

## 🛠️ Customization

Most scripts use CSS variables for easy customization. Look for the `:root` section at the top of each script to modify colors and styles:

```css
:root {
    --tpr-default: #e3dede;
    --tpr-seafoam: #52e3c3;
    --tpr-bg: #0c1621;
    /* ... more variables */
}
```

## 📝 Script Details

### Notion Dark Theme
The most comprehensive script with features including:
- Complete dark theme with custom syntax highlighting
- Custom fonts (Quicksand for body, Poppins for headers)
- Enhanced code block styling
- "Back to Top" button in sidebar
- Fixed color consistency across all UI elements

### Everand Playback
Advanced media controls for audiobook listening:
- Precise playback speed control (0.25x - 4.0x)
- Volume adjustment in 5% increments
- Smart section jumping (divides track into 10 sections)
- Visual feedback indicators
- Non-intrusive keyboard shortcuts

## ⚠️ Notes

- Some scripts are site-specific and will only activate on matching URLs
- Scripts may need updates if websites change their structure
- The Wiki Theme script disables when embedded in iframes (for Notion compatibility)
- Debug mode available in Everand Playback (set `DEBUG = true`)

These scripts are provided as-is for personal use. Modify and distribute freely.

## 👤 Author

**SkyColtNinja** (Clayton Jinks)

---
