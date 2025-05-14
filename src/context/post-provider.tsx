"use client";

import { Tables } from "database.types";
import { createContext } from "react";

export interface PostContextType extends Partial<Tables<"posts">> {
  user?: Partial<Tables<"users">>;
  replies?: PostContextType[];
}

export const PostContext = createContext<PostContextType>({} as PostContextType);

export interface PostProviderProps extends PostContextType {
  children: React.ReactNode;
}

export function PostProvider({ children, ...post }: PostProviderProps) {
  return <PostContext.Provider value={post}>{children}</PostContext.Provider>;
}
