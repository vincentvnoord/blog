import { getBlogPostById } from '@/application/blog';
import BlogEditor from '@/components/dashboard/blog-editor/blog-editor';

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
    <BlogEditor blog={blog} />
  )
}

