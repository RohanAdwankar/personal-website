import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function Home() {
  const blogPosts = getAllPosts();
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto" style={{ padding: '40px' }}>
        {/* Home Section */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-center">
            {/* Left side - Profile Picture */}
            <div className="flex-shrink-0">
              <div className="relative rounded-full overflow-hidden border-4 border-[#998B7B] shadow-lg" style={{ width: '200px', height: '200px' }}>
                <Image
                  src="/profile.jpg"
                  alt="Rohan Adwankar"
                  fill
                  className="object-cover object-right"
                  style={{ transform: 'scale(1.4)' }}
                  priority
                />
              </div>
            </div>

            {/* Right side - Description and Thoughts */}
            <div className="flex-1 w-full">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center md:text-left">
                howdy!
              </h1>

              <div className="text-lg space-y-4 text-center md:text-left" style={{ lineHeight: '1' }}>
                <p>
                  i'm rohan adwanakar and i like building things! 
                </p>
               
                <p>
                  i&apos;ll be joining <span className="text-[#998B7B] font-semibold">nvidia</span> after i graduate from <span className="text-[#998B7B] font-semibold">ucla</span>
                </p>
                
                <p style={{ marginBottom: '0.5rem' }}>
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
              <div className="flex gap-6 mt-6 justify-center md:justify-start">
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

              {/* Thoughts */}
              <div style={{ marginTop: '0.7rem' }}>
                <h2 className="text-3xl font-bold text-center md:text-left">thoughts</h2>
                
                <ul className="space-y-3 text-center md:text-left" style={{ paddingLeft: '0' }}>
                  {blogPosts.map((post) => (
                    <li key={post.slug} style={{ listStyle: 'none' }}>
                      <Link
                        href={`/${post.slug}`}
                        className="text-[#7894B0] hover:underline text-lg"
                      >
                        • {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
