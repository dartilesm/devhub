"use client";

import { PostWrapper } from "@/components/post/post-wrapper";
import { Tables } from "database.types";
import { createContext } from "react";

export interface PostContextType extends Partial<Tables<"posts">> {
  user: Partial<Tables<"users">>;
}

export const PostContext = createContext<PostContextType>({} as PostContextType);

interface PostProviderProps extends Tables<"posts"> {
  user: Partial<Tables<"users">>;
  children: React.ReactNode;
}

export function PostProvider({ children, ...post }: PostProviderProps) {
  return (
    <PostContext.Provider value={post}>
      <PostWrapper>{children}</PostWrapper>
    </PostContext.Provider>
  );
}
