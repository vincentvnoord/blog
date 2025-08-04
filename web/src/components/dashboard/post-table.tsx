"use client";

import { useTableStore } from "@/application/stores/table-store";
import { BlogPostMetadata } from "@/data-access/repositories/blog-repository";
import Link from "next/link";
import { useEffect } from "react";

export const PostTable = ({ initialPosts }: { initialPosts: BlogPostMetadata[] }) => {
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

const ListedPost = ({ id, title, published_at }: BlogPostMetadata) => {

  return (
    <Link
      href={`/dashboard/posts/${id}`}
      className="grid hover:bg-gray-50 rounded-md cursor-pointer grid-cols-[40%_1fr_1fr_1fr] p-2 col-span-4"
    >
      <span className="pr-2 truncate">{title}</span>
      <span className="truncate">{published_at ? "Published" : "Draft"}</span>
      <span className="truncate">{published_at && new Date(published_at).toLocaleDateString()}</span>
      <span className="truncate"></span>
    </Link >
  );
}
