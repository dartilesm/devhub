"use client";

import { PostWrapper } from "@/components/post/post-wrapper";
import { User } from "@clerk/nextjs/server";
import { Tables } from "database.types";
import { createContext } from "react";

export interface PostContextType extends Tables<"posts"> {
  user: Pick<User, "id" | "firstName" | "lastName" | "username" | "imageUrl">;
}

export const PostContext = createContext<PostContextType>({} as PostContextType);

interface PostProviderProps extends Tables<"posts"> {
  user: Pick<User, "id" | "firstName" | "lastName" | "username" | "imageUrl">;
  children: React.ReactNode;
}

export function PostProvider({ children, ...post }: PostProviderProps) {
  return (
    <PostContext.Provider value={post}>
      <PostWrapper>{children}</PostWrapper>
    </PostContext.Provider>
  );
}
