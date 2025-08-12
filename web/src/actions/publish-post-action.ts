"use server";

import { getBlogPostById, publishBlogPost, unpublishBlogPost } from "@/application/blog";
import { requireAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const togglePublishPostAction = async (id: number, isPublished: boolean) => {
  await requireAuth();

  try {
    if (isPublished) {
      await unpublishBlogPost(id);
    } else {
      await publishBlogPost(id);
    }

    const post = await getBlogPostById(id.toString());

    revalidatePath("/");
    revalidatePath("/posts/" + post?.slug);
  } catch (error) {
    console.error("Error toggling publish state:", error);
    throw new Error("Failed to toggle publish state");
  }
}
