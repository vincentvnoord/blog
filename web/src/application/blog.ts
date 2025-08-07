import { BlogPostDto, BlogRepository } from "@/data-access/repositories/blog-repository";
import { BlogPostSchema } from "./validation/validate-blog-post";
import { makeSlug } from "@/lib/make-slug";

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

export async function createBlogPost(data: BlogPostSchema) {
  const dto: BlogPostDto = {
    id: -1,
    title: data.title,
    description: data.description,
    content: data.content,
    slug: makeSlug(data.title),
  }

  const repository = new BlogRepository();
  return await repository.createBlogPost(dto);
}

export async function getBlogPosts(options?: { published?: boolean }) {
  const repository = new BlogRepository();
  return await repository.getBlogPosts(options);
}

export async function publishBlogPost(id: number) {
  const repository = new BlogRepository();
  return await repository.publishBlogPost(id);
}

export async function unpublishBlogPost(id: number) {
  const repository = new BlogRepository();
  return await repository.unpublishBlogPost(id);
}

export async function tryDeleteBlogPost(id: number) {
  const repository = new BlogRepository();
  return await repository.tryDeleteBlogPost(id);
}
