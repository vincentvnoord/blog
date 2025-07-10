import { getBlogPostBySlug, getBlogPostMetadata } from '@/application/blog';
import { specialFont } from '@/lib/fonts';
import { BlogPost } from '@/components/blog-post';

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

  const publishedAt = new Date(blog.published_at);

  return (
    <div className="w-full flex flex-col items-center pt-10 md:pt-12">
      <div className="flex flex-col w-full p-4 max-w-2xl">
        <h1 className={`${specialFont.className} text-3xl md:text-5xl font-semibold`}>{blog.title}</h1>
        <p className='pt-2'>{publishedAt.toLocaleString()}</p>
        <BlogPost content={blog.content} />
      </div>
    </div>
  )
}
