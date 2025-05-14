import { createPostReply } from "@/actions/post-reply";
import { PostThreadLine } from "@/components/post/post-thread-line";
import { UserPost } from "@/components/post/user-post";
import { ThoughtBox, thoughtBoxSchema } from "@/components/thought-box";
import { PostContextType } from "@/context/post-provider";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Tables } from "database.types";
import { z } from "zod";
interface ReplyToPostProps {
  post: Partial<Tables<"replies">> & {
    user?: Partial<Tables<"users">>;
    replies?: PostContextType[];
  };
  onSubmit?: (data?: PostgrestSingleResponse<Tables<"replies">[]>) => void;
}

export function ReplyToPost({ post, onSubmit = () => Promise.resolve() }: ReplyToPostProps) {
  console.log({ post });
  async function handleOnSubmit(data: z.infer<typeof thoughtBoxSchema>) {
    const { id, post_id: postId } = post;

    const result = await createPostReply({
      comment: data.comment,
      post_id: postId,
      parent_reply_id: id,
    });

    if (result.data) onSubmit(result);

    return result;
  }

  return (
    <div className='relative flex flex-col gap-2'>
      <PostThreadLine isFirstInThread={true} isLastInThread={true} />
      <UserPost {...post} />
      <ThoughtBox placeholder={`Reply to @${post.user?.username}`} onSubmit={handleOnSubmit} />
    </div>
  );
}
