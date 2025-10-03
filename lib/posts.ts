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
  return markdown
    .split('\n')
    .map(line => {
      // Headers
      if (line.startsWith('### ')) return `<h3 class="text-2xl font-bold mt-8 mb-4 text-[#3A5864]">${line.slice(4)}</h3>`;
      if (line.startsWith('## ')) return `<h2 class="text-3xl font-bold mt-10 mb-6 text-[#3A5864]">${line.slice(3)}</h2>`;
      if (line.startsWith('# ')) return `<h1 class="text-4xl font-bold mt-12 mb-8 text-[#3A5864]">${line.slice(2)}</h1>`;
      
      // Lists
      if (line.startsWith('- ')) {
        const content = line.slice(2)
          .replace(/`([^`]+)`/g, '<code class="bg-[#E5DFD5] px-2 py-1 rounded text-[#998B7B]">$1</code>')
          .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        return `<li class="ml-6 mb-2">${content}</li>`;
      }
      
      // Numbered lists
      if (/^\d+\.\s/.test(line)) {
        const content = line.replace(/^\d+\.\s/, '')
          .replace(/`([^`]+)`/g, '<code class="bg-[#E5DFD5] px-2 py-1 rounded text-[#998B7B]">$1</code>')
          .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        return `<li class="ml-6 mb-2">${content}</li>`;
      }
      
      // Regular paragraphs
      if (line.trim() && !line.startsWith('<')) {
        const processedLine = line
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#7894B0] hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
          .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
          .replace(/`([^`]+)`/g, '<code class="bg-[#E5DFD5] px-2 py-1 rounded text-[#998B7B]">$1</code>');
        return `<p class="mb-6">${processedLine}</p>`;
      }
      
      return line;
    })
    .join('\n');
}
