"use client";

import { togglePublishPostAction } from "@/actions/publish-post-action";
import { BlogPostRender } from "@/components/blog-post";
import { BlogPost } from "@/data-access/repositories/blog-repository";
import { specialFont } from "@/lib/fonts";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

export default function BlogEditor({ blog }: { blog: BlogPost }) {

  return (
    <div className="w-full flex flex-col items-center pt-10 md:pt-12">
      <div className="flex flex-col w-full p-4 max-w-2xl">
        <PublishButton id={blog.id} publishedAt={blog.published_at} />
        <h1 className={`${specialFont.className} text-3xl md:text-5xl font-bold`}>{blog.title}</h1>
        <p className="text-md md:text-lg mt-4">{blog.description}</p>
        <BlogPostRender content={blog.content} />
      </div>
    </div>
  )
}

const PublishButton = ({ id, publishedAt }: { id: number, publishedAt?: string }) => {
  const [published, setPublished] = useState<Date | undefined>(publishedAt ? new Date(publishedAt) : undefined);

  const mutation = useMutation({
    mutationFn: () => togglePublishPostAction(id, !!published),
    onSuccess: () => {
      setPublished(prev => prev ? undefined : new Date());
    },
  })

  const { isPending } = mutation;

  const handlePublish = () => {
    if (isPending) return;
    mutation.mutate();
  }

  return (
    <div className="flex border-gray-200 p-2 rounded-lg justify-end gap-4 items-center w-full mb-4">
      <p>
        {published ? `Published on ${published.toLocaleDateString()}` : "This post is currently unpublished."}
      </p>
      <button
        onClick={handlePublish}
        disabled={isPending}
        className={`${published ? "bg-destructive" : "bg-primary"} ${isPending && "opacity-10"} flex items-center justify-center transition-colors duration-100 ease-in min-w-32 font-bold self-end text-white px-4 py-2 rounded disabled:opacity-80 hover:opacity-80`}
      >
        {
          isPending ? (
            <div className="animate-spin">
              <LoaderCircle strokeWidth={2.5} />
            </div>
          ) : (
            published ? "Unpublish" : "Publish"
          )
        }
      </button>
    </div>
  );
}
