import styled from 'styled-components';

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-rg);
  padding: 0 var(--spacing-md) var(--spacing-xl) var(--spacing-md);
  margin: 0 auto;
  max-width: 800px;
  font-size: var(--font-size-md);
  line-height: 1.5;
  color: var(--text-color);
  text-wrap: pretty;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    font-weight: 600;
    color: var(--heading-text-color);
  }

  em {
    font-style: italic;
  }

  small {
    font-size: 80%;
  }

  h1 {
    font-size: var(--font-size-2xl);
  }
  h2 {
    font-size: var(--font-size-xl);
  }
  h3 {
    font-size: var(--font-size-lg);
  }
  h4 {
    font-size: var(--font-size-md);
  }
  h5 {
    font-size: var(--font-size-rg);
  }
  h6 {
    font-size: var(--font-size-sm);
  }

  a {
    color: var(--link-text-color);
    text-decoration: none;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  hr {
    border: none;
    border-bottom: 1px solid var(--border-color);
    margin: var(--spacing-xl) 0;
    width: 100%;
  }

  pre,
  code {
    border: 1px solid var(--code-border-color);
    border-radius: var(--border-radius-sm);
    font-family: monospace;
    font-size: var(--font-size-rg);
    font-weight: 500;
    background-color: var(--code-background-color);
    color: var(--code-text-color);
    overflow-x: visible;
    word-break: break-all;
  }

  pre {
    display: block;
    width: 100%;
    padding: var(--spacing-rg);
    margin: var(--spacing-sm) 0;

    > code {
      border: none;
      padding: 0;
      width: 100%;
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      white-space: pre-line;
      overflow-x: visible;
      background-color: transparent;
      color: inherit;
    }
  }

  code {
    display: inline-flex;
    padding: 0 var(--spacing-xs);
  }

  blockquote {
    position: relative;
    padding: var(--spacing-rg);
    border-radius: var(--border-radius-xs) var(--border-radius-md)
      var(--border-radius-md) var(--border-radius-xs);
    border-left: var(--spacing-xs) solid var(--quote-border-color);
    background-color: var(--quote-background-color);
    color: var(--quote-text-color);

    > img {
      float: left;
      display: inline-block;
      border: 3px solid var(--quote-border-color);
      border-radius: 100%;
      margin-top: calc(var(--spacing-xl) * -1);
      margin-right: var(--spacing-rg);
      margin-left: calc(var(--spacing-xl) * -1);
    }
  }

  ul {
    padding-left: var(--spacing-md);
    list-style-type: disc;
    margin: var(--spacing-rg) 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3);
  }
`;
