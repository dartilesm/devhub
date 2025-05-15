"use client";

import { NestedPost } from "@/types/nested-posts";
import { Tables } from "database.types";
import { createContext } from "react";

export interface PostContextType extends NestedPost {
  user?: Partial<Tables<"users">>;
  isThread?: boolean;
  isFirstInThread?: boolean;
  isLastInThread?: boolean;
}

export const PostContext = createContext<PostContextType>({} as PostContextType);

export interface PostProviderProps extends PostContextType {
  children: React.ReactNode;
}

export function PostProvider({ children, ...post }: PostProviderProps) {
  return <PostContext.Provider value={post}>{children}</PostContext.Provider>;
}
