"use server";

import { getBlogPosts } from "@/application/blog";

export async function getPostsListAction() {
  try {
    const posts = await getBlogPosts();
    return posts;
  } catch (error) {
    console.error("Error fetching posts list:", error);
    throw new Error("Failed to fetch posts list");
  }
}
