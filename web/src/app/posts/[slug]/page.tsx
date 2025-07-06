import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { getBlogPostBySlug, getBlogPostMetadata } from '@/application/blog';
import { specialFont } from '@/lib/fonts';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!slug) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  const metadata = await getBlogPostMetadata(slug);
  if (!metadata) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${metadata.title} | Vincent van Noord | Blog`,
    description: `${metadata.description}`,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!slug) {
    return <div className="w-full flex items-center justify-center pt-12">Blog post not found</div>;
  }

  const blog = await getBlogPostBySlug(slug);
  if (!blog) {
    return <div className="w-full flex items-center justify-center pt-12">Blog post not found</div>;
  }

  return (
    <div className="w-full flex flex-col items-center pt-10 md:pt-12">
      <div className="flex flex-col w-full p-4 max-w-2xl">
        <h1 className={`${specialFont.className} text-3xl md:text-5xl font-semibold`}>{blog.title}</h1>
        <main className="flex w-full flex-col pt-4 pb-12">
          <ReactMarkdown
            components={{
              h1: ({ ...props }) => <h1 className={`${specialFont.className} text-3xl md:text-5xl font-bold mt-4`} {...props} />,
              h2: ({ ...props }) => <h2 className={`${specialFont.className} text-2xl md:text-3xl font-semibold mt-4`} {...props} />,
              h3: ({ ...props }) => <h3 className={`${specialFont.className} text-2xl font-semibold mt-4`} {...props} />,
              h4: ({ ...props }) => <h4 className={`${specialFont.className} text-2xl font-semibold mt-4`} {...props} />,
              p: ({ ...props }) => <p className="text-md md:text-lg" {...props} />,
              a: ({ href }) => <Link
                href={href || '#'}
                className="text-blue-500 hover:underline"

              />,
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </main>
      </div>
    </div>
  )
}
