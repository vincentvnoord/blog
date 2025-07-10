import { getBlogPosts } from "@/application/blog";
import { isAuthorized } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    if (!isAuthorized(req))
      return new Response("Unauthorized", { status: 401 });

    const blogPosts = await getBlogPosts();

    return new Response(JSON.stringify(blogPosts), { status: 200 })
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
