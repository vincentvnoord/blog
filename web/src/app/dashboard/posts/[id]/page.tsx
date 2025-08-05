import { getBlogPostById } from '@/application/blog';
import { specialFont } from '@/lib/fonts';
import { BlogPost } from '@/components/blog-post';

export default async function BlogDraftPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) {
    return <div className="w-full flex items-center justify-center pt-12">Blog post not found</div>;
  }

  const blog = await getBlogPostById(id);
  if (!blog) {
    return <div className="w-full flex items-center justify-center pt-12">Blog post not found</div>;
  }

  return (
    <div className="w-full flex flex-col items-center pt-10 md:pt-12">
      <div className="flex flex-col w-full p-4 max-w-2xl">
        <h1 className={`${specialFont.className} text-3xl md:text-5xl font-bold`}>{blog.title}</h1>
        <BlogPost content={blog.content} />
      </div>
    </div>
  )
}

