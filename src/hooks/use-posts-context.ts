"use client";

import { PostsContext } from "@/context/posts-context";
import { useContext } from "react";
/**
 * Hook to access the posts context
 */
export function usePostsContext() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePostsContext must be used within a PostsProvider");
  }
  return context;
}
