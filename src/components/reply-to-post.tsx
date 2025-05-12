import { createPostReply } from "@/actions/post-reply";
import { PostCard } from "@/components/post/post-card";
import { PostContent } from "@/components/post/post-card-content";
import { PostFooter } from "@/components/post/post-card-footer";
import { PostHeader } from "@/components/post/post-card-header";
import { PostThreadLine } from "@/components/post/post-thread-line";
import { ThoughtBox, thoughtBoxSchema } from "@/components/thought-box";
import { PostProvider, PostContextType } from "@/context/post-provider";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Tables } from "database.types";
import { z } from "zod";
interface ReplyToPostProps {
  post: PostContextType;
  onSubmit?: (data?: PostgrestSingleResponse<Tables<"replies">[]>) => void;
}

export function ReplyToPost({ post, onSubmit = () => Promise.resolve() }: ReplyToPostProps) {
  async function handleOnSubmit(data: z.infer<typeof thoughtBoxSchema>) {
    const { id } = post;

    const result = await createPostReply({
      comment: data.comment,
      post_id: id,
      parent_reply_id: null,
    });

    if (result.data) onSubmit(result);

    return result;
  }

  return (
    <div className='relative flex flex-col gap-2'>
      <PostThreadLine isFirstInThread={true} isLastInThread={true} />
      <PostProvider {...post}>
        <PostCard>
          <PostHeader />
          <PostContent />
          <PostFooter />
        </PostCard>
      </PostProvider>
      <ThoughtBox placeholder={`Reply to @${post.user.username}`} onSubmit={handleOnSubmit} />
    </div>
  );
}
