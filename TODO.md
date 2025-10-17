# Todo

- Make YT's "Save to playlist" menu persist until closed
    - We create an event listener for any "Save to playlist" button clicks.
    - Once clicked, we force `z-index: 2202 !important;` and `display: visible;` on the playlist menu.
    - The menu persists until the user clicks outside of it.
