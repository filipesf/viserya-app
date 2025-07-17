export const cleanMarkdown = (markdown: string): string => {
  // Replace headers
  let cleaned = markdown.replace(/^#+\s+/gm, '');

  // Replace bold (**text** or __text__)
  cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, '$1');
  cleaned = cleaned.replace(/__(.*?)__/g, '$1');

  // Replace italics (*text* or _text_)
  cleaned = cleaned.replace(/\*(.*?)\*/g, '$1');
  cleaned = cleaned.replace(/_(.*?)_/g, '$1');

  // Replace inline code `code`
  cleaned = cleaned.replace(/`(.*?)`/g, '$1');

  // Replace code blocks ```code``` or ~~~code~~~
  cleaned = cleaned.replace(/```[\s\S]*?```/g, '');
  cleaned = cleaned.replace(/~~~[\s\S]*?~~~/g, '');

  // Replace blockquotes
  cleaned = cleaned.replace(/^\s*>+\s+/gm, '');

  // Replace links [text](url)
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

  // Replace images ![alt](url)
  cleaned = cleaned.replace(/!\[([^\]]*)\]\([^\)]+\)/g, '$1');

  // Replace horizontal rules
  cleaned = cleaned.replace(/^-{3,}/g, '');

  // Replace lists (unordered and ordered)
  cleaned = cleaned.replace(/^\s*[-*+]\s+/gm, '');
  cleaned = cleaned.replace(/^\s*\d+\.\s+/gm, '');

  // Replace strikethrough ~~text~~
  cleaned = cleaned.replace(/~~(.*?)~~/g, '$1');

  return cleaned.trim();
};

export const markdownToHtml = (markdown: string): { __html: string } => {
  // Replace headers
  let html = markdown
    .replace(/^######\s+(.*$)/gim, '<h6>$1</h6>')
    .replace(/^#####\s+(.*$)/gim, '<h5>$1</h5>')
    .replace(/^####\s+(.*$)/gim, '<h4>$1</h4>')
    .replace(/^###\s+(.*$)/gim, '<h3>$1</h3>')
    .replace(/^##\s+(.*$)/gim, '<h2>$1</h2>')
    .replace(/^#\s+(.*$)/gim, '<h1>$1</h1>');

  // Replace bold (**text** or __text__)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');

  // Replace italics (*text* or _text_)
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.*?)_/g, '<em>$1</em>');

  // Replace inline code `code`
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');

  // Replace code blocks ```code``` or ~~~code~~~
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  html = html.replace(/~~~([\s\S]*?)~~~/g, '<pre><code>$1</code></pre>');

  // Replace blockquotes
  html = html.replace(/^\s*>+\s+(.*)$/gim, '<blockquote>$1</blockquote>');

  // Replace links [text](url)
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2">$1</a>');

  // Replace images ![alt](url)
  html = html.replace(/!\[([^\]]*)\]\((https?:\/\/[^\)]+)\)/g, '<img alt="$1" src="$2" />');

  // Replace horizontal rules
  html = html.replace(/^-{3,}/gm, '<hr>');

  // Handle unordered lists (group list items together in <ul> tags)
  html = html.replace(/((^|\n)\s*[-*+]\s+.+)+/g, match => {
    const items = match.trim().split(/\n\s*[-*+]\s+/).map(item => `<li>${item.replace(/^\s*[-*+]\s*/, '').trim()}</li>`);
    return `<ul>${items.join('')}</ul>`;
  });

  // Handle ordered lists (group list items together in <ol> tags)
  html = html.replace(/(^|\n)(\d+\.\s+.+)(\n|$)/g, match => {
    const items = match.trim().split(/\n\s*\d+\.\s+/).map(item => `<li>${item.trim()}</li>`);
    return `<ol>${items.join('')}</ol>`;
  });

  // Replace strikethrough ~~text~~
  html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');

  // Wrap remaining text that is not inside other elements in <p> tags
  html = html.replace(/([^\n]+)(?=\n|$)/g, match => {
    // Skip already converted elements (like <h1>, <ul>, etc.)
    if (match.match(/^<.*>$/)) {
      return match;
    }
    return `<p>${match.trim()}</p>`;
  });


  return {__html: html.trim()};
}
