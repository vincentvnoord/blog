import { z } from 'zod';

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
});

export type BlogPostSchema = z.infer<typeof blogPostSchema>;
