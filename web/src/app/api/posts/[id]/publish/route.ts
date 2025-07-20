import { publishBlogPost } from "@/application/blog";
import { isAuthorized } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAuthorized(req))
      return new Response("Unauthorized", { status: 401 })

    const p = await params;
    const id = Number(p.id);
    if (!Number.isInteger(id) || id <= 0) {
      return new Response("Invalid ID", { status: 400 });
    }

    const post = await publishBlogPost(id);
    if (!post) {
      return new Response("No blog post is affected", { status: 404 })
    }

    revalidatePath(`/posts/${post.slug}`);

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
