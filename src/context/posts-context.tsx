"use client";

import { createContext, useState } from "react";
import { PostContextType } from "./post-provider";

interface PostsContextType {
  posts: PostContextType[];
  addPost: (post: PostContextType) => void;
  setPosts: (posts: PostContextType[]) => void;
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
  initialPosts: PostContextType[];
}) {
  const [posts, setPosts] = useState<PostContextType[]>(initialPosts);

  function addPost(post: PostContextType) {
    console.log("Adding post", post, posts);
    setPosts([post, ...posts]);
  }

  return (
    <PostsContext.Provider value={{ posts, addPost, setPosts }}>{children}</PostsContext.Provider>
  );
}
