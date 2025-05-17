"use client";

import { NestedPost } from "@/types/nested-posts";
import { Tables } from "database.types";
import { useParams } from "next/navigation";
import { createContext } from "react";

export interface PostContextType extends NestedPost {
  user?: Partial<Tables<"users">>;
  isThread?: boolean;
  isFirstInThread?: boolean;
  isLastInThread?: boolean;
  isModal?: boolean;

  /**
   * Indicates if this post is the main post being viewed in a thread page.
   * This is used to determine if the post should be rendered differently
   * as it's the focus of the current page.
   */
  isThreadPagePost?: boolean;
}

export const PostContext = createContext<PostContextType>({} as PostContextType);

export interface PostProviderProps extends PostContextType {
  children: React.ReactNode;
  isModal?: boolean;
}

export function PostProvider({ children, isModal = false, ...post }: PostProviderProps) {
  const { postId } = useParams();
  console.log({ postId, isModal, isThreadPagePost: !isModal && post.id === postId });
  return (
    <PostContext.Provider
      value={{
        ...post,
        isModal,
        isThreadPagePost: !isModal && post.id === postId,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
