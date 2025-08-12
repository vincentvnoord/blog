"use server";

import { getBlogPosts } from "@/application/blog";
import { requireAuth } from "@/lib/auth";

export async function getPostsListAction() {
  await requireAuth();

  try {
    const posts = await getBlogPosts();
    return posts;
  } catch (error) {
    console.error("Error fetching posts list:", error);
    throw new Error("Failed to fetch posts list");
  }
}
