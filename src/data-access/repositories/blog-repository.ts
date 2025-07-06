import { Repository } from "../repository";

type BlogPostMetadata = {
  title: string;
  description: string;
}

type BlogPost = BlogPostMetadata & {
  id: number;
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
}
