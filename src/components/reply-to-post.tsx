import { createPostReply } from "@/actions/post-reply";
import { PostThreadLine } from "@/components/post/post-thread-line";
import { UserPost } from "@/components/post/user-post";
import { ThoughtBox, thoughtBoxSchema } from "@/components/thought-box";
import { PostProvider } from "@/context/post-provider";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Tables } from "database.types";
import { z } from "zod";

interface ReplyToPostProps {
  post: Partial<Tables<"posts">> & {
    user?: Partial<Tables<"users">>;
  };
  onSubmit?: (data?: PostgrestSingleResponse<Tables<"posts">[]>) => void;
}

export function ReplyToPost({ post, onSubmit = () => Promise.resolve() }: ReplyToPostProps) {
  console.log({ post });
  async function handleOnSubmit(data: z.infer<typeof thoughtBoxSchema>) {
    const { id } = post;

    const result = await createPostReply({
      comment: data.comment,
      parent_post_id: id,
    });

    if (result.data) onSubmit(result);

    return result;
  }

  return (
    <div className='relative flex flex-col gap-2'>
      <PostThreadLine isFirstInThread={true} isLastInThread={true} />
      <UserPost post={post} />
      <ThoughtBox placeholder={`Reply to @${post.user?.username}`} onSubmit={handleOnSubmit} />
    </div>
  );
}
