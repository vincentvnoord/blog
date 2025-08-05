"use client";

import { useTableStore } from "@/application/stores/table-store";
import { BlogPostMetadata } from "@/data-access/repositories/blog-repository";
import { useEffect } from "react";
import { ListedPost } from "./listed-post";

export const PostTable = ({ initialPosts }: { initialPosts: BlogPostMetadata[] }) => {
  console.log("PostTable rendered with initialPosts:", initialPosts);
  const { posts, setPosts } = useTableStore();

  useEffect(() => {
    setPosts(initialPosts);

  }, [initialPosts, setPosts])

  return (
    < div className="bg-white p-4 grid grid-cols-[40%_1fr_1fr_1fr] shadow-sm rounded-lg overflow-hidden" >
      <TableHeader className="pl-2">Title</TableHeader>
      <TableHeader>Status</TableHeader>
      <TableHeader>Date</TableHeader>
      <TableHeader className="text-right pr-2">Actions</TableHeader>

      {
        posts.map((post) => (
          <ListedPost key={post.id} {...post} />
        ))
      }
    </div >
  )
}

const TableHeader = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  return (
    <div className={`pb-2 font-semibold text-gray-700 ${className}`}>
      {children}
    </div>
  );
}


