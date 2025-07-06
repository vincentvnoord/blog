import { BlogRepository } from "@/data-access/repositories/blog-repository";

export async function getBlogPostBySlug(slug: string) {
  const repository = new BlogRepository();
  return await repository.getBlogPostBySlug(slug);
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
