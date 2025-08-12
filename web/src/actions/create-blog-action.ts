"use server";

import { FieldValues } from "react-hook-form";
import { blogPostSchema } from "@/application/validation/validate-blog-post";
import { createBlogPost } from "@/application/blog";
import { requireAuth } from "@/lib/auth";

export const createBlogPostAction = async (fields: FieldValues) => {
  await requireAuth();

  const parseResult = blogPostSchema.safeParse(fields);
  if (parseResult.success === false) {
    console.error("Validation failed:", parseResult.error);
    return { error: parseResult.error };
  }

  try {
    const res = await createBlogPost(parseResult.data);
    return { post: res };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return { error: "Something went wrong while uploading blog post" };
  }
}
