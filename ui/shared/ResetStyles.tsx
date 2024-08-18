import { createGlobalStyle } from 'styled-components';

export const ResetStyles = createGlobalStyle`
/* Resetting default browser styles */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}

/* Reset list styles */
ol, ul {
  list-style: none;
}

/* Reset quotes */
blockquote, q {
  quotes: none;
}

blockquote::before, blockquote::after,
q::before, q::after {
  content: '';
  content: none;
}

/* Reset table borders and spacing */
table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* Reset link appearance */
a {
  background-color: transparent;
  text-decoration: none;
  color: inherit;
}

/* Improved accessibility for focus states */
:focus {
  outline: 2px dashed var(--primary-background-color); /* Visible outline for focus */
  outline-offset: 2px;
}

/* Accessible focus styles for interactive elements */
a:focus, button:focus, input:focus, textarea:focus {
  outline: 2px solid var(--primary-background-color);
  outline-offset: 2px;
}

/* Improve media element defaults */
img, video, audio {
  max-width: 100%;
  height: auto;
}

/* Enhance form controls */
button, input, select, textarea {
  font-family: inherit; /* Inherit font from parent */
  font-size: inherit; /* Inherit size from parent */
  line-height: inherit; /* Inherit line height */
  background-color: transparent;
  color: inherit;
  border: 1px solid var(--border-color); /* Consistent border style */
  padding: var(--padding-small); /* Ensure a minimum padding */
  box-sizing: border-box; /* Include padding and border in element's width and height */
}

/* Disable button borders by default */
button {
  border: 0;
  cursor: pointer; /* Make buttons clickable */
}

/* Improve text rendering */
html {
  -webkit-text-size-adjust: 100%; /* Prevent font scaling on mobile */
  -moz-osx-font-smoothing: grayscale; /* Optimize text rendering */
  -webkit-font-smoothing: antialiased; /* Optimize text rendering */
}

/* Set a default body line-height for readability */
body {
  line-height: 1.5;
}

/* Ensure responsive typography */
body, input, button, textarea, select {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* Ensure consistent box-sizing */
*, *::before, *::after {
  box-sizing: border-box;
}

/* Accessibility: Ensure a consistent focus style */
:focus-visible {
  outline: 2px dashed var(--primary-background-color);
  outline-offset: 2px;
}

:focus:not(:focus-visible) {
  outline: none;
}

/* Remove all animations/transitions for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
`;
