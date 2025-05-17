import { PostComposer } from "@/components/post/post-composer";
import { PostThreadLine } from "@/components/post/post-thread-line";
import { UserPost } from "@/components/post/user-post";
import { Tables } from "database.types";

interface ReplyToPostProps {
  post: Partial<Tables<"posts">> & {
    user?: Partial<Tables<"users">>;
  };
  onSubmit?: () => void;
}

export function ReplyToPost({ post, onSubmit = () => Promise.resolve() }: ReplyToPostProps) {
  return (
    <div className='relative flex flex-col gap-2'>
      <PostThreadLine isFirstInThread={true} isLastInThread={true} />
      <UserPost post={post} isModal />
      <PostComposer
        placeholder={`Reply to @${post.user?.username}`}
        onSubmit={onSubmit}
        postId={post.id}
      />
    </div>
  );
}
