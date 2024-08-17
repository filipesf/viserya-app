import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
:root {
  /* Primitive Colours */
  --color-red-50: #fff0ef;
  --color-red-100: #ffdedb;
  --color-red-200: #ffc4c0;
  --color-red-300: #ff9d96;
  --color-red-400: #ff695e;
  --color-red-500: #f93f32;
  --color-red-600: #e3251a;
  --color-red-700: #bb1d13;
  --color-red-800: #971c14;
  --color-red-900: #751c16;
  --color-red-950: #400e0a;
  --color-yellow-50: #f9f8e9;
  --color-yellow-100: #f2efc6;
  --color-yellow-200: #e7db94;
  --color-yellow-300: #d9c35b;
  --color-yellow-400: #cdaa35;
  --color-yellow-500: #bd9529;
  --color-yellow-600: #9e7222;
  --color-yellow-700: #7c521e;
  --color-yellow-800: #66421f;
  --color-yellow-900: #56371f;
  --color-yellow-950: #311e11;
  --color-green-50: #f3fee3;
  --color-green-100: #e3fdc3;
  --color-green-200: #caf991;
  --color-green-300: #a8f257;
  --color-green-400: #87e62c;
  --color-green-500: #68c814;
  --color-green-600: #4c9b0e;
  --color-green-700: #3a730f;
  --color-green-800: #345f13;
  --color-green-900: #2a4a14;
  --color-green-950: #162908;
  --color-blue-50: #eaf9ff;
  --color-blue-100: #d1f0ff;
  --color-blue-200: #aee7ff;
  --color-blue-300: #7bdaff;
  --color-blue-400: #44c4ff;
  --color-blue-500: #21a3ff;
  --color-blue-600: #0f85ff;
  --color-blue-700: #0a6ced;
  --color-blue-800: #0f55b9;
  --color-blue-900: #12488c;
  --color-blue-950: #13335f;
  --color-neutral-50: #f2f5f6;
  --color-neutral-100: #dfe3e7;
  --color-neutral-200: #c3cdd1;
  --color-neutral-300: #9babb3;
  --color-neutral-400: #6d818d;
  --color-neutral-500: #536672;
  --color-neutral-600: #46545f;
  --color-neutral-700: #3c464f;
  --color-neutral-800: #363d43;
  --color-neutral-900: #31363c;
  --color-neutral-950: #1e2226;

  /* Spacing */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  --spacing-12: 48px;
  --spacing-16: 64px;
  --spacing-18: 72px;
  --spacing-24: 96px;

  --spacing-xs: var(--spacing-1);
  --spacing-sm: var(--spacing-2);
  --spacing-rg: var(--spacing-4);
  --spacing-md: var(--spacing-6);
  --spacing-lg: var(--spacing-8);
  --spacing-xl: var(--spacing-12);

  /* Typography */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-rg: 16px;
  --font-size-md: 18px;
  --font-size-lg: 24px;
  --font-size-xl: 32px;

  /* Border Radius */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;

  /* Transitions */
  --transition-speed: 300ms;

  /* Card */
  --card-background-color: var(--secondary-color);

  @media screen and (max-width: 768px) {
    /* Spacing */
    --spacing-rg: var(--spacing-3);
    --spacing-md: var(--spacing-4);
    --spacing-lg: var(--spacing-6);
    --spacing-xl: var(--spacing-8);

    /* Typography */
    --font-size-lg: 20px;
    --font-size-xl: 24px;
  }
}

/* Light Theme */
[data-theme="light"] {
  /* Colours */
  --background-color: var(--color-neutral-50);
  --background-reverse-color: var(--color-neutral-900);

  --text-color: var(--color-neutral-900);
  --text-reverse-color: var(--color-neutral-50);

  --primary-color: var(--color-yellow-500);
  --primary-color-hover: var(--color-yellow-700);

  --secondary-color: var(--color-neutral-100);
  --secondary-color-hover: var(--color-neutral-200);

  --border-color: var(--color-neutral-300);
  --border-color-hover: var(--color-neutral-400);

  /* Shadows */
  --box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  transition:
    background-color var(--transition-speed),
    border-color var(--transition-speed),
    color var(--transition-speed);
}

/* Dark Theme */
[data-theme="dark"] {
  /* Colours */
  --background-color: var(--color-neutral-950);
  --background-reverse-color: var(--color-neutral-50);

  --text-color: var(--color-neutral-50);
  --text-reverse-color: var(--color-neutral-950);

  --primary-color: var(--color-yellow-500);
  --primary-color-hover: var(--color-yellow-700);

  --secondary-color: var(--color-neutral-900);
  --secondary-color-hover: var(--color-neutral-800);

  --border-color: var(--color-neutral-600);
  --border-color-hover: var(--color-neutral-700);

  /* Shadows adjusted for dark mode */
  --box-shadow: 0 2px 4px rgba(255, 255, 255, 0.05);

  transition:
    background-color var(--transition-speed),
    color var(--transition-speed),
    border-color  var(--transition-speed);
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  min-height: 100svh;
}

a {
  color: var(--primary-color);
  text-decoration: none;
}
`;
