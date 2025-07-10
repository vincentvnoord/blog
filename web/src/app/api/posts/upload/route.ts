import { createBlogPost } from "@/application/blog";
import { BlogPostDto } from "@/data-access/repositories/blog-repository";
import { BlogExistsError } from "@/entities/errors/blog";
import { makeSlug } from "@/lib/make-slug";
import { NextRequest } from "next/server";
import { isAuthorized } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    if (!isAuthorized(req))
      return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const { title, description, content } = body;
    if (!title || !description || !content) {
      return new Response("Missing required fields", { status: 400 });
    }

    if (title.length > 60) {
      return new Response("Field length exceeds limit", { status: 400 });
    }

    const slug = makeSlug(title);
    const post: BlogPostDto = {
      title,
      description,
      content,
      slug,
    };

    const res = await createBlogPost(post);

    return new Response(JSON.stringify({ id: res.id }), { status: 200 });
  } catch (error) {
    if (error instanceof BlogExistsError) {
      return new Response(error.message, { status: 409 });
    }

    console.error("Error processing request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
