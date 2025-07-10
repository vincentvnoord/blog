import { BlogExistsError } from "@/entities/errors/blog";
import { Repository } from "../repository";

type BlogPostMetadata = {
  title: string;
  description: string;
  slug: string;
}

export type BlogPost = BlogPostMetadata & {
  id: number;
  content: string;
}

export type BlogPostDto = BlogPostMetadata & {
  slug: string;
  content: string;
}

export class BlogRepository extends Repository {
  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const query = `
      SELECT id, title, content
      FROM blogposts
      WHERE slug = $1
    `;
    const values = [slug];

    try {
      const result = await this.client.query(query, values);
      if (result.rows.length > 0) {
        return result.rows[0] as BlogPost;
      }
      return null;
    } catch (error) {
      console.error("Error fetching blog post:", error);
      throw error;
    }
  }

  async getAllBlogPostTitles(): Promise<string[]> {
    const query = `
      SELECT title
      FROM blogposts
    `;

    try {
      const result = await this.client.query(query);
      return result.rows.map(row => row.title);
    } catch (error) {
      console.error("Error fetching blog post titles:", error);
      throw error;
    }
  }

  async getBlogPostMetadata(slug: string): Promise<BlogPostMetadata | null> {
    const query = `
      SELECT title, description
      FROM blogposts
      WHERE slug = $1
      LIMIT 1
    `;
    const values = [slug];

    try {
      const result = await this.client.query(query, values);
      if (result.rows.length > 0) {
        return result.rows[0] as BlogPostMetadata;
      }

      return null;
    } catch (error) {
      console.error("Error fetching blog post metadata:", error);
      throw error;
    }
  }

  async createBlogPost(post: BlogPostDto): Promise<BlogPost> {
    const existingPost = await this.getBlogPostBySlug(post.slug);
    if (existingPost) {
      throw new BlogExistsError(`Blog post with slug "${post.slug}" already exists.`);
    }

    const query = `
      INSERT INTO blogposts (title, description, content, slug)
      VALUES ($1, $2, $3, $4)
      RETURNING id, title, content
    `;

    const values = [post.title, post.description, post.content, post.slug];

    try {
      const result = await this.client.query(query, values);
      return result.rows[0] as BlogPost;
    } catch (error) {
      console.error("Error creating blog post:", error);
      throw error;
    }
  }

  async getBlogPostById(id: number): Promise<BlogPost | null> {
    const query = `
      SELECT id, title, content
      FROM blogposts
      WHERE id = $1
    `;
    const values = [id];

    try {
      const result = await this.client.query(query, values);
      if (result.rows.length > 0) {
        return result.rows[0] as BlogPost;
      }
      return null;
    } catch (error) {
      console.error("Error fetching blog post by ID:", error);
      throw error;
    }
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    const query = `
      SELECT id, title, slug, created_at, published_at
      FROM blogposts
      ORDER BY created_at DESC
    `;

    try {
      const result = await this.client.query(query);
      return result.rows as BlogPost[];
    } catch (error) {
      console.error("Error fetching list of blog posts:", error);
      throw error;
    }
  }
}
