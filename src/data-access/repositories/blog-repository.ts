import { Repository } from "../repository";

type BlogPost = {
  id: number;
  title: string;
  content: string;
}

export class BlogRepository extends Repository {
  async getBlogPostBySlug(title: string): Promise<BlogPost | null> {
    const query = `
      SELECT id, title, content
      FROM blogposts
      WHERE slug = $1
    `;
    const values = [title];

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
}
