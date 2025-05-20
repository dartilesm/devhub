"use client";

import { NestedPost } from "@/types/nested-posts";
import { createContext, useState } from "react";

interface PostsContextType {
  posts: NestedPost[];
  addPost: (post: NestedPost) => void;
  setPosts: (posts: NestedPost[]) => void;
}

export const PostsContext = createContext<PostsContextType | null>(null);

/**
 * Provider component that wraps your app and makes posts state available to any
 * child component that calls usePostsContext().
 */
export function PostsProvider({
  children,
  initialPosts,
}: {
  children: React.ReactNode;
  initialPosts: NestedPost[];
}) {
  const [posts, setPosts] = useState<NestedPost[]>(initialPosts);

  function addPost(post: NestedPost) {
    console.log("Adding post", post, posts);
    setPosts([post, ...posts]);
  }

  return (
    <PostsContext.Provider value={{ posts, addPost, setPosts }}>{children}</PostsContext.Provider>
  );
}
