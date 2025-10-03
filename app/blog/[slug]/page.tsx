import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug, parseMarkdown } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

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
