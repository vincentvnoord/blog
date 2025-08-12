"use server";

import { tryDeleteBlogPost } from "@/application/blog";
import { requireAuth } from "@/lib/auth";

export async function deletePostAction(id: number) {
  await requireAuth();

  const deleteResult = await tryDeleteBlogPost(id);
  if (!deleteResult) {
    throw new Error("No blog post is affected");
  }
}
