"use client";

import { ReplyToPost } from "@/components/reply-to-post";
import { NestedPost } from "@/types/nested-posts";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";

interface PostCommentModalProps {
  post: NestedPost;
  isOpen: boolean;
  action: "reply" | "clone";
  onOpenChange: () => void;
}

export function PostCommentModal({ post, action, onOpenChange }: PostCommentModalProps) {
  return (
    <Modal onClose={onOpenChange} defaultOpen size='xl' backdrop='blur'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader />
            <ModalBody>
              {action === "reply" && <ReplyToPost post={post} onSubmit={onClose} />}
            </ModalBody>
            <ModalFooter />
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
