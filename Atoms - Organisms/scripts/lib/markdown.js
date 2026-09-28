/**
 * Zero-dependency Markdown to HTML parser
 * Supports: Headers, Tables, Code blocks with syntax highlighting hooks,
 * Blockquotes, Callouts, Lists (ordered/unordered/task), Links, Images, Inline styles
 */

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function parseInline(markdown) {
  if (!markdown) return '';

  // Protect images and links from later emphasis/code regexes (which would
  // otherwise mangle underscores inside hrefs, e.g. docs/AETHERIS_DESIGN_...)
  const stash = [];
  const park = (html) => {
    const token = `\uE000${stash.length}\uE001`;
    stash.push(html);
    return token;
  };

  // Images: ![alt](url)
  markdown = markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
    return park(`<img src="${escapeHtml(url)}" alt="${escapeHtml(alt)}" loading="lazy" class="ax-md-img" />`);
  });

  // Links: [text](url)
  markdown = markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
    const isExternal = url.startsWith('http://') || url.startsWith('https://');
    const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    return park(`<a href="${escapeHtml(url)}"${target} class="ax-md-link">${parseInline(text)}</a>`);
  });

  // Code: `code`
  markdown = markdown.replace(/`([^`]+)`/g, (match, code) => {
    return `<code class="ax-code-inline">${escapeHtml(code)}</code>`;
  });

  // Bold & Italic: ***text*** or ___text___
  markdown = markdown.replace(/(\*\*\*|___)(.*?)\1/g, '<strong><em>$2</em></strong>');

  // Bold: **text** or __text__
  markdown = markdown.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>');

  // Italic: *text* or _text_ (underscore requires word boundaries so
  // identifiers like AETHERIS_DESIGN_REPORT or snake_case stay untouched)
  markdown = markdown.replace(/\*([^*\n]+)\*/g, '<em>$1</em>');
  markdown = markdown.replace(/(^|[^\w])_([^_\n]+)_(?!\w)/g, '$1<em>$2</em>');

  // Strikethrough: ~~text~~
  markdown = markdown.replace(/~~(.*?)~~/g, '<del>$1</del>');

  // Keyboard badges: [[key]] or <kbd>
  markdown = markdown.replace(/<kbd>(.*?)<\/kbd>/gi, '<kbd class="ax-kbd">$1</kbd>');

  // Restore parked links/images
  return markdown.replace(/\uE000(\d+)\uE001/g, (m, i) => stash[+i]);
}

function parseMarkdown(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const html = [];
  const toc = [];
  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeBlockContent = [];
  let inTable = false;
  let tableHeaders = [];
  let tableAlignments = [];
  let tableRows = [];
  let inList = false;
  let listType = ''; // 'ul' or 'ol'
  let inBlockquote = false;
  let blockquoteContent = [];

  function closeCodeBlock() {
    if (inCodeBlock) {
      const code = escapeHtml(codeBlockContent.join('\n'));
      const lang = codeBlockLang ? ` data-lang="${escapeHtml(codeBlockLang)}"` : '';
      const langBadge = codeBlockLang ? `<span class="ax-code-lang">${escapeHtml(codeBlockLang)}</span>` : '';
      html.push(
        `<div class="ax-code-block"${lang}>` +
        `<div class="ax-code-header">${langBadge}<button class="ax-copy-btn" onclick="copyCode(this)" title="Copy code"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy</button></div>` +
        `<pre><code class="language-${escapeHtml(codeBlockLang || 'text')}">${code}</code></pre>` +
        `</div>`
      );
      inCodeBlock = false;
      codeBlockLang = '';
      codeBlockContent = [];
    }
  }

  function closeTable() {
    if (inTable) {
      let tableHtml = '<div class="ax-table-wrapper"><table class="ax-table"><thead><tr>';
      tableHeaders.forEach((th, idx) => {
        const align = tableAlignments[idx] ? ` style="text-align: ${tableAlignments[idx]}"` : '';
        tableHtml += `<th${align}>${parseInline(th.trim())}</th>`;
      });
      tableHtml += '</tr></thead><tbody>';
      tableRows.forEach(row => {
        tableHtml += '<tr>';
        row.forEach((cell, idx) => {
          const align = tableAlignments[idx] ? ` style="text-align: ${tableAlignments[idx]}"` : '';
          tableHtml += `<td${align}>${parseInline(cell.trim())}</td>`;
        });
        tableHtml += '</tr>';
      });
      tableHtml += '</tbody></table></div>';
      html.push(tableHtml);
      inTable = false;
      tableHeaders = [];
      tableAlignments = [];
      tableRows = [];
    }
  }

  function closeList() {
    if (inList) {
      html.push(`</${listType}>`);
      inList = false;
      listType = '';
    }
  }

  function closeBlockquote() {
    if (inBlockquote) {
      const rawText = blockquoteContent.join('\n');
      let calloutType = 'note';
      let title = '';
      let body = rawText;

      const calloutMatch = rawText.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\s*(.*))?\n?([\s\S]*)$/i);
      if (calloutMatch) {
        calloutType = calloutMatch[1].toLowerCase();
        title = calloutMatch[2] || calloutMatch[1].toUpperCase();
        body = calloutMatch[3] || '';
      }

      if (calloutMatch) {
        html.push(
          `<div class="ax-callout ax-callout-${calloutType}">` +
          `<div class="ax-callout-title">${escapeHtml(title)}</div>` +
          `<div class="ax-callout-body">${parseInline(body)}</div>` +
          `</div>`
        );
      } else {
        html.push(`<blockquote class="ax-blockquote">${parseInline(rawText)}</blockquote>`);
      }

      inBlockquote = false;
      blockquoteContent = [];
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Fenced Code Block
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        closeCodeBlock();
      } else {
        closeTable();
        closeList();
        closeBlockquote();
        inCodeBlock = true;
        codeBlockLang = line.trim().slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Horizontal Rule
    if (/^(?:---|\*\*\*|___)\s*$/.test(line.trim())) {
      closeTable();
      closeList();
      closeBlockquote();
      html.push('<hr class="ax-hr" />');
      continue;
    }

    // Tables
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      closeList();
      closeBlockquote();
      const cells = line.split('|').slice(1, -1);
      
      // Check if this is the separator row
      if (cells.every(c => /^[\s:-]+$/.test(c))) {
        tableAlignments = cells.map(c => {
          const t = c.trim();
          if (t.startsWith(':') && t.endsWith(':')) return 'center';
          if (t.endsWith(':')) return 'right';
          if (t.startsWith(':')) return 'left';
          return 'left';
        });
        inTable = true;
      } else if (!inTable) {
        tableHeaders = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      closeTable();
    }

    // Blockquote
    if (line.trim().startsWith('>')) {
      closeTable();
      closeList();
      inBlockquote = true;
      blockquoteContent.push(line.trim().replace(/^>\s?/, ''));
      continue;
    } else if (inBlockquote && line.trim() !== '') {
      blockquoteContent.push(line.trim());
      continue;
    } else if (inBlockquote && line.trim() === '') {
      closeBlockquote();
      continue;
    }

    // Headers
    const headerMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headerMatch) {
      closeTable();
      closeList();
      closeBlockquote();
      const level = headerMatch[1].length;
      const title = headerMatch[2].trim();
      const id = slugify(title);
      toc.push({ level, title, id });
      html.push(`<h${level} id="${id}" class="ax-heading ax-h${level}"><a href="#${id}" class="ax-anchor">#</a>${parseInline(title)}</h${level}>`);
      continue;
    }

    // Lists: Ordered or Unordered
    const ulMatch = line.match(/^(\s*)([-*+])\s+(.*)$/);
    const olMatch = line.match(/^(\s*)(\d+)\.\s+(.*)$/);
    if (ulMatch || olMatch) {
      closeTable();
      closeBlockquote();
      const isOl = !!olMatch;
      const targetType = isOl ? 'ol' : 'ul';
      const content = isOl ? olMatch[3] : ulMatch[3];

      if (!inList || listType !== targetType) {
        closeList();
        inList = true;
        listType = targetType;
        html.push(`<${listType} class="ax-list ax-${listType}">`);
      }

      // Task list item
      const taskMatch = content.match(/^\[([ xX])\]\s+(.*)$/);
      if (taskMatch) {
        const checked = taskMatch[1].toLowerCase() === 'x';
        html.push(
          `<li class="ax-task-item"><input type="checkbox" ${checked ? 'checked' : ''} disabled class="ax-checkbox" /> <span>${parseInline(taskMatch[2])}</span></li>`
        );
      } else {
        html.push(`<li>${parseInline(content)}</li>`);
      }
      continue;
    } else if (inList && line.trim() === '') {
      // Check if next line continues list
      if (i + 1 < lines.length && !lines[i + 1].match(/^(\s*)([-*+]|\d+\.)\s+/)) {
        closeList();
      }
      continue;
    } else if (inList) {
      closeList();
    }

    // Empty lines
    if (line.trim() === '') {
      closeBlockquote();
      continue;
    }

    // Standard Paragraph
    html.push(`<p class="ax-p">${parseInline(line.trim())}</p>`);
  }

  closeCodeBlock();
  closeTable();
  closeList();
  closeBlockquote();

  return {
    contentHtml: html.join('\n'),
    toc
  };
}

module.exports = {
  parseMarkdown,
  parseInline,
  slugify,
  escapeHtml
};
