"use client";

import { useTableStore } from "@/application/stores/table-store";
import { useEffect } from "react";
import { ListedPost } from "./listed-post";
import { useQuery } from "@tanstack/react-query";
import { getPostsListAction } from "@/actions/get-posts-list.action";

export const PostTable = () => {
  const { posts, setPosts } = useTableStore();

  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: getPostsListAction,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data, setPosts]);

  return (
    <div className="bg-white mt-4 border border-gray-200 p-4 grid grid-cols-[40%_1fr_1fr_1fr] shadow-xs rounded-lg overflow-hidden" >
      <TableHeader className="pl-2">Title</TableHeader>
      <TableHeader>Status</TableHeader>
      <TableHeader>Published At</TableHeader>
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


