import { BlogPostDto, BlogRepository } from "@/data-access/repositories/blog-repository";

export async function getBlogPostBySlug(slug: string) {
  const repository = new BlogRepository();
  return await repository.getBlogPostBySlug(slug, { published: true });
}

export async function getBlogPostById(id: string) {
  const repository = new BlogRepository();
  try {
    const parsedId = parseInt(id, 10);
    return await repository.getBlogPostById(parsedId);
  } catch (error) {
    console.error("Invalid ID format:", error);
    return null;
  }
}

export async function getAllBlogPostTitles() {
  const repository = new BlogRepository();
  return await repository.getAllBlogPostTitles();
}

export async function getBlogPostMetadata(slug: string) {
  const repository = new BlogRepository();
  const metadata = await repository.getBlogPostMetadata(slug);
  return metadata;
}

export async function createBlogPost(dto: BlogPostDto) {
  const repository = new BlogRepository();
  return await repository.createBlogPost(dto);
}

export async function getBlogPosts() {
  const repository = new BlogRepository();
  return await repository.getBlogPosts();
}

export async function publishBlogPost(id: number) {
  const repository = new BlogRepository();
  return await repository.publishBlogPost(id);
}
