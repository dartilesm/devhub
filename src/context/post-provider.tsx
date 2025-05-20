"use client";

import { PostCommentModal } from "@/components/post/post-comment-modal";
import { NestedPost } from "@/types/nested-posts";
import { Tables } from "database.types";
import { useParams } from "next/navigation";
import { createContext, useState } from "react";

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
  togglePostModal: (isOpen?: boolean) => void;
}

export const PostContext = createContext<PostContextType>({} as PostContextType);

export interface PostProviderProps extends PostContextType {
  children: React.ReactNode;
  isModal?: boolean;
  togglePostModal: never;
}

export function PostProvider({ children, isModal = false, ...post }: PostProviderProps) {
  const { postId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<"reply" | "clone">("reply");

  function togglePostModal(isOpen?: boolean, action: "reply" | "clone" = "reply") {
    setIsModalOpen(isOpen ?? !isModalOpen);
    setAction(action);
  }

  return (
    <PostContext.Provider
      value={{
        ...post,
        isModal,
        isThreadPagePost: !isModal && post.id === postId,
        togglePostModal,
      }}
    >
      {children}
      {isModalOpen && (
        <PostCommentModal
          post={post}
          isOpen={isModalOpen}
          onOpenChange={togglePostModal}
          action={action}
        />
      )}
    </PostContext.Provider>
  );
}
