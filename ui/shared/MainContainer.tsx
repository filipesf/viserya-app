import styled from 'styled-components';

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-rg);
  padding: 0 var(--spacing-md) var(--spacing-xl) var(--spacing-md);
  margin: 0 auto;
  max-width: 960px;
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
    font-size: var(--font-siez-h1);
  }
  h2 {
    font-size: var(--font-siez-h2);
  }
  h3 {
    font-size: var(--font-siez-h3);
  }
  h4 {
    font-size: var(--font-siez-h4);
  }
  h5 {
    font-size: var(--font-siez-h5);
  }
  h6 {
    font-size: var(--font-siez-h6);
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
    font-size: var(--font-size-rg);

    > code {
      border: none;
      padding: 0;
      width: 100%;
      font-family: inherit;
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
    font-size: 90%;
  }

  blockquote {
    position: relative;
    padding: var(--spacing-rg);
    margin: var(--spacing-sm) 0;
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

  ul,
  ol {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    padding-left: var(--spacing-md);
    margin: var(--spacing-rg) 0;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }
`;
