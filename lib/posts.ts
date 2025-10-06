import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  // Check if posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Extract title (first line starting with #)
      const lines = fileContents.split('\n');
      const titleLine = lines.find(line => line.startsWith('# '));
      const title = titleLine ? titleLine.replace('# ', '').trim() : slug;
      
      // Create excerpt from first paragraph after title
      const contentStart = lines.findIndex(line => line.startsWith('# ')) + 1;
      const firstParagraph = lines.slice(contentStart).find(line => line.trim() && !line.startsWith('#'));
      const excerpt = firstParagraph ? firstParagraph.substring(0, 150) + '...' : '';
      
      return {
        slug,
        title,
        excerpt,
        content: fileContents,
      };
    });

  return posts;
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const lines = fileContents.split('\n');
  const titleLine = lines.find(line => line.startsWith('# '));
  const title = titleLine ? titleLine.replace('# ', '').trim() : slug;
  
  const contentStart = lines.findIndex(line => line.startsWith('# ')) + 1;
  const firstParagraph = lines.slice(contentStart).find(line => line.trim() && !line.startsWith('#'));
  const excerpt = firstParagraph ? firstParagraph.substring(0, 150) + '...' : '';

  return {
    slug,
    title,
    excerpt,
    content: fileContents,
  };
}

export function parseMarkdown(markdown: string): string {
  // We want to support fenced code blocks using ```
  const lines = markdown.split('\n');
  const out: string[] = [];
  let inCodeBlock = false;
  let codeLang = '';
  let codeBuffer: string[] = [];

  const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const flushCodeBlock = () => {
    if (!inCodeBlock) return;
    const code = escapeHtml(codeBuffer.join('\n'));
    const langClass = codeLang ? `language-${codeLang}` : '';
  // use external bottom margin (mb-6) so content after the code block isn't too close
  out.push(`<pre class="bg-[#1E1E1E] rounded p-3 mb-6 overflow-x-auto"><code class="${langClass} text-sm text-[#E5DFD5]">${code}</code></pre>`);
    codeBuffer = [];
    inCodeBlock = false;
    codeLang = '';
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Fenced code block start/end
    const fenceMatch = line.match(/^```\s*(\S+)?\s*$/);
    if (fenceMatch) {
      if (!inCodeBlock) {
        // starting a code block
        inCodeBlock = true;
        codeLang = (fenceMatch[1] || '').trim();
        codeBuffer = [];
      } else {
        // closing a code block
        flushCodeBlock();
      }
      continue;
    }

    if (inCodeBlock) {
      // inside code block: collect raw lines without further processing
      codeBuffer.push(line);
      continue;
    }

    // Headers
    if (line.startsWith('### ')) {
      out.push(`<h3 class="text-2xl font-bold mt-6 mb-2 text-[#3A5864]">${line.slice(4)}</h3>`);
      continue;
    }
    if (line.startsWith('## ')) {
      out.push(`<h2 class="text-3xl font-bold mt-8 mb-3 text-[#3A5864]">${line.slice(3)}</h2>`);
      continue;
    }
    if (line.startsWith('# ')) {
      out.push(`<h1 class="text-4xl font-bold mt-8 mb-4 text-[#3A5864]">${line.slice(2)}</h1>`);
      continue;
    }

    // Lists
    if (line.startsWith('- ')) {
      const content = line.slice(2)
        .replace(/`([^`]+)`/g, '<code class="bg-[#E5DFD5] px-2 py-1 rounded text-[#998B7B]">$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      out.push(`<li class="ml-6 mb-1.5">${content}</li>`);
      continue;
    }

    // Numbered lists
    if (/^\d+\.\s/.test(line)) {
      const content = line.replace(/^\d+\.\s/, '')
        .replace(/`([^`]+)`/g, '<code class="bg-[#E5DFD5] px-2 py-1 rounded text-[#998B7B]">$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      out.push(`<li class="ml-6 mb-1.5">${content}</li>`);
      continue;
    }

    // Regular paragraphs
    if (line.trim() && !line.startsWith('<')) {
      const processedLine = line
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#7894B0] hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code class="bg-[#E5DFD5] px-2 py-1 rounded text-[#998B7B]">$1</code>');
      out.push(`<p class="mb-4">${processedLine}</p>`);
      continue;
    }

    out.push(line);
  }

  // If file ends while still in a code block, flush it
  if (inCodeBlock) flushCodeBlock();

  return out.join('\n');
}
