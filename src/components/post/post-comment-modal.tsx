import { ReplyToPost } from "@/components/reply-to-post";
import { PostContextType } from "@/context/post-provider";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
interface PostCommentModalProps {
  post: PostContextType;
  isOpen: boolean;
  action: "reply" | "clone";
  onOpenChange: (isOpen: boolean) => void;
}

export function PostCommentModal({ post, action, onOpenChange }: PostCommentModalProps) {
  return (
    <Modal onOpenChange={onOpenChange} defaultOpen size='xl'>
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
