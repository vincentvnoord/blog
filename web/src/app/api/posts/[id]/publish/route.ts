import { publishBlogPost } from "@/application/blog";
import { isAuthorized } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!isAuthorized(req))
      return new Response("Unauthorized", { status: 401 })

    const id = Number(params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return new Response("Invalid ID", { status: 400 });
    }

    const res = await publishBlogPost(id);
    if (!res) {
      return new Response("No blog post is affected", { status: 404 })
    }

    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
