import { notFound } from "next/navigation";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "ergonomics-workflow",
    title: "My Ergonomic Developer Workflow",
    date: "October 3, 2025",
    content: `
# My Ergonomic Developer Workflow

As someone who spends countless hours coding, I've learned that comfort and efficiency go hand in hand. Here's how I've optimized my setup to reduce strain and boost productivity.

## Neovim: The Heart of My Workflow

I switched to [Neovim](https://neovim.io/) about two years ago, and it's been a game-changer. The modal editing paradigm means my hands rarely leave the home row, dramatically reducing the repetitive strain that comes with constant mouse usage.

### Why Neovim?

- **Efficiency**: Modal editing means less hand movement
- **Customization**: My [nvim config](https://github.com/RohanAdwankar/nvim) is tailored exactly to my needs
- **Speed**: Everything is keyboard-driven, no context switching to reach for a mouse
- **Extensibility**: Lua-based configuration and plugin ecosystem

## Split Keyboard: Keeping My Wrists Happy

I use a split ergonomic keyboard, which allows my shoulders to stay in a more natural position. The separation between the halves means my arms can be shoulder-width apart, reducing the inward rotation that standard keyboards force.

### Benefits I've Noticed:

- Less shoulder tension at the end of the day
- Reduced wrist pronation
- More comfortable typing posture
- Better alignment with my monitor and workspace

## Vimium: Vim Everywhere

Even when I'm browsing, I use [Vimium](https://vimium.github.io/) to navigate the web with Vim keybindings. This creates a consistent interface across all my digital tools and keeps my hands on the keyboard.

### My Favorite Vimium Features:

- \`f\` for link hints - no more hunting with the mouse
- \`j/k\` for scrolling
- \`H/L\` for back/forward navigation
- Search with \`/\`

## The Results

This setup has dramatically reduced the hand and wrist fatigue I used to experience. More importantly, it's made coding feel more natural and fluid. If you spend hours at a keyboard every day, investing in ergonomics isn't just about comfort—it's about sustainability in your career.

### Tips for Getting Started:

1. **Start gradually**: Don't try to change everything at once
2. **Practice regularly**: Muscle memory takes time
3. **Customize for you**: What works for me might need tweaking for your needs
4. **Be patient**: The initial learning curve pays off exponentially

Your future self will thank you for investing in good ergonomics today.
    `,
  },
];

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen px-8 md:px-16 lg:px-24 xl:px-32" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <article className="max-w-4xl mx-auto">
        <Link 
          href="/"
          className="text-[#7894B0] hover:underline mb-8 inline-block"
        >
          ← Back to home
        </Link>
        
        <header className="mb-12">
          <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
        </header>

        <div 
          className="prose prose-lg max-w-none"
          style={{ lineHeight: '2' }}
          dangerouslySetInnerHTML={{ 
            __html: post.content
              .split('\n')
              .map(line => {
                // Headers
                if (line.startsWith('### ')) return `<h3 class="text-2xl font-bold mt-8 mb-4 text-[#3A5864]">${line.slice(4)}</h3>`;
                if (line.startsWith('## ')) return `<h2 class="text-3xl font-bold mt-10 mb-6 text-[#3A5864]">${line.slice(3)}</h2>`;
                if (line.startsWith('# ')) return `<h1 class="text-4xl font-bold mt-12 mb-8 text-[#3A5864]">${line.slice(2)}</h1>`;
                
                // Lists
                if (line.startsWith('- ')) return `<li class="ml-6 mb-2">${line.slice(2).replace(/`([^`]+)`/g, '<code class="bg-[#E5DFD5] px-2 py-1 rounded text-[#998B7B]">$1</code>')}</li>`;
                
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
              .join('\n')
          }}
        />
      </article>
    </div>
  );
}
