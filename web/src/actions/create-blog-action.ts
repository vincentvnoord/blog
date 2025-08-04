"use server";

import { FieldValues } from "react-hook-form";
import { blogPostSchema } from "@/application/validation/validate-blog-post";
import { createBlogPost } from "@/application/blog";

export const createBlogPostAction = async (fields: FieldValues) => {
  const parseResult = blogPostSchema.safeParse(fields);
  if (parseResult.success === false) {
    console.error("Validation failed:", parseResult.error);
    return;
  }

  try {
    const res = await createBlogPost(parseResult.data);
    return res;
  } catch (error) {
    console.error("Error creating blog post:", error);
    // Handle error appropriately, e.g., show a notification or alert
    return;
  }
}
