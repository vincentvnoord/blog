"use server";

import { tryDeleteBlogPost } from "@/application/blog";

export async function deletePostAction(id: number) {
  const deleteResult = await tryDeleteBlogPost(id);
  if (!deleteResult) {
    throw new Error("No blog post is affected");
  }
}
