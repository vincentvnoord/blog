import { BlogExistsError, BlogNotFoundError } from "@/entities/errors/blog";
import { Repository } from "../repository";

export type BlogPostMetadata = {
  id: number;
  title: string;
  description: string;
  slug: string;
  published_at?: string;
}

export type BlogPost = BlogPostMetadata & {
  content: string;
}

export type BlogPostDto = BlogPostMetadata & {
  slug: string;
  content: string;
}

export class BlogRepository extends Repository {
  async getBlogPostBySlug(slug: string, filter?: { published?: boolean }): Promise<BlogPost | null> {
    const conditions = ["slug = $1"];

    if (filter?.published === false) {
      conditions.push('published_at IS NULL');
    } else if (filter?.published === true) {
      conditions.push('published_at IS NOT NULL');
    }

    const whereClause = conditions.join(" AND ");

    const query = `
      SELECT id, title, content, published_at
      FROM blogposts
      WHERE ${whereClause}
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
      SELECT id, title, description, slug, created_at, published_at
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


  // Returns slug associated with the id
  async publishBlogPost(id: number): Promise<{ slug: string } | null> {
    const query = `
      UPDATE blogposts
      SET published_at = NOW()
      WHERE id = $1
      RETURNING slug
    `;

    const values = [id];

    try {
      const result = await this.client.query(query, values);
      if (result.rows.length > 0) {
        return result.rows[0] as { slug: string };
      }

      return null;
    } catch (error) {
      console.error("Error publishing blog post:", error);
      throw error;
    }
  }

  async unpublishBlogPost(id: number): Promise<string> {
    const query = `
      UPDATE blogposts
      SET published_at = NULL
      WHERE id = $1
      RETURNING slug
    `;

    const values = [id];

    try {
      const result = await this.client.query(query, values);
      if (result.rows.length === 0) {
        throw new BlogNotFoundError(`No blog post found with ID ${id}`);
      } else {
        return result.rows[0].slug;
      }
    } catch (error) {
      console.error("Error publishing blog post:", error);
      throw error;
    }
  }

  async tryDeleteBlogPost(id: number): Promise<boolean> {
    const query = `
      DELETE FROM blogposts
      WHERE id = $1
    `;

    const values = [id];

    try {
      const result = await this.client.query(query, values);
      if (result.rowCount === 0) {
        throw new BlogNotFoundError(`No blog post found with ID ${id}`);
      }

      return true;
    } catch (error) {
      console.error("Error publishing blog post:", error);
      throw error;
    }
  }
}
