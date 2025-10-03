import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    slug: "ergonomics-workflow",
    title: "My Ergonomic Developer Workflow",
    excerpt: "How I use Neovim, a split keyboard, and Vimium to reduce strain and boost productivity.",
    date: "October 3, 2025",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen px-8 md:px-16 lg:px-24 xl:px-32" style={{ paddingTop: '120px', paddingLeft: '120px', paddingRight: '120px' }}>
      {/* Home Section */}
      <section className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left side - Profile Picture */}
          <div className="w-full lg:w-1/4 flex justify-center lg:justify-start">
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-[#998B7B] shadow-lg">
              <Image
                src="/profile.jpg"
                alt="Rohan Adwankar"
                fill
                className="object-cover object-right"
                priority
              />
            </div>
          </div>

          {/* Right side - Description */}
          <div className="w-full lg:w-3/4 flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-12">
                howdy!
              </h1>

              <div className="space-y-6 text-lg leading-relaxed" style={{ lineHeight: '3.5' }}>
                <p className="text-xl">
                  i&apos;ll be joining <span className="text-[#998B7B] font-semibold">nvidia</span> after i graduate from <span className="text-[#998B7B] font-semibold">ucla</span>
                </p>
                
                <p>
                  i built{" "}
                  <a 
                    href="https://github.com/RohanAdwankar/share-df" 
                    className="text-[#7894B0] hover:underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    share-df
                  </a>{" "}
                  for collaborating on python dataframes
                  {" "}
                  <a 
                    href="https://pypi.org/project/share-df/" 
                    className="inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img 
                      src="https://static.pepy.tech/badge/share-df" 
                      alt="PyPI Downloads"
                      className="inline"
                    />
                  </a>
                </p>

                <p>
                  i use{" "}
                  <a 
                    href="https://github.com/RohanAdwankar/nvim" 
                    className="text-[#7894B0] hover:underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    neovim
                  </a>{" "}
                  btw
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-6 mt-8">
                <a 
                  href="https://github.com/RohanAdwankar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3A5864] hover:text-[#998B7B] transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/in/rohanadwankar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3A5864] hover:text-[#998B7B] transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="https://devpost.com/rohan-adwankar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3A5864] hover:text-[#998B7B] transition-colors"
                  aria-label="Devpost"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.002 1.61L0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/>
                  </svg>
                </a>
                <a 
                  href="https://scholar.google.com/citations?user=zHfkhl0AAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3A5864] hover:text-[#998B7B] transition-colors"
                  aria-label="Google Scholar"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Language Stats - Right Side */}
            <div className="flex-shrink-0 lg:w-auto">
              <img 
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=RohanAdwankar&hide=html,css&langs_count=10&v=180&layout=compact&hide_border=true&bg_color=E5DFD5&text_color=3A5864&title_color=3A5864" 
                alt="Most used languages"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="max-w-7xl mx-auto mt-24" style={{ marginTop: '6rem' }}>
        <h2 className="text-3xl font-bold mb-12" style={{ marginBottom: '3rem' }}>thoughts</h2>
        
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex-shrink-0 w-80 bg-[#E5DFD5] rounded-lg hover:shadow-lg transition-shadow duration-300"
              style={{ padding: '3rem' }}
            >
              <h3 className="text-xl font-semibold mb-3 text-[#3A5864]">
                {post.title}
              </h3>
              <p className="text-[#3A5864]/80 leading-relaxed">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
