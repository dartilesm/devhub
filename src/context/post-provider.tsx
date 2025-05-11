"use client";

import { createContext } from "react";

type PostContextType = {
  id: string;
};

export const PostContext = createContext<PostContextType>({
  id: "",
});

export function PostProvider({ children, id }: { children: React.ReactNode; id: string }) {
  return <PostContext.Provider value={{ id }}>{children}</PostContext.Provider>;
}
