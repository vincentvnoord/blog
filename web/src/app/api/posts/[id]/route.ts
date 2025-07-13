import { tryDeleteBlogPost } from "@/application/blog";
import { BlogNotFoundError } from "@/entities/errors/blog";
import { isAuthorized } from "@/lib/auth";
import { NextRequest } from "next/server";


export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!isAuthorized(req)) {
      return new Response("Unauthorized", { status: 401 });
    }

    const p = await params;
    const id = Number(p.id);

    if (!Number.isInteger(id) || id <= 0) {
      return new Response("Invalid ID", { status: 400 });
    }

    const deleteResult = await tryDeleteBlogPost(id);
    if (!deleteResult) {
      return new Response("No blog post is affected", { status: 404 });
    }

    return new Response("Blog post deleted successfully", { status: 200 });
  } catch (error) {
    if (error instanceof BlogNotFoundError) {
      return new Response(error.message, { status: 404 });
    }

    console.error("Error processing request to delete post:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
