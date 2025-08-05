import { BlogPostMetadata } from "@/data-access/repositories/blog-repository";
import { create } from "zustand";

export interface TableStore {
  posts: BlogPostMetadata[];
  setPosts: (newPosts: BlogPostMetadata[]) => void;
  addPost: (newPost: BlogPostMetadata) => void;
  deletePost: (postId: number) => void;
}

export const useTableStore = create<TableStore>((set, get) => ({
  posts: [],
  setPosts: (newPosts: BlogPostMetadata[]) => {
    set({ posts: newPosts });
  },
  addPost: (newPost: BlogPostMetadata) => {
    const currentPosts = get().posts;
    set({ posts: [newPost, ...currentPosts] });
  },
  deletePost(postId) {
    const currentPosts = get().posts; const updatedPosts = currentPosts.filter(post => post.id !== postId);
    set({ posts: updatedPosts });
  },
}));
