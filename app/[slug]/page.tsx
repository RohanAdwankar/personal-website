import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug, parseMarkdown } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ padding: '80px 40px' }}>
      <article className="max-w-3xl w-full">
        <Link 
          href="/"
          className="text-[#7894B0] hover:underline mb-8 inline-block"
        >
          ← Back to home
        </Link>
        
        <div 
          className="prose prose-lg max-w-none"
          style={{ lineHeight: '2' }}
          dangerouslySetInnerHTML={{ 
            __html: parseMarkdown(post.content)
          }}
        />
      </article>
    </div>
  );
}
