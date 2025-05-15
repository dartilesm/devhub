import { PostCard } from "@/components/post/post-card";
import { PostContent } from "@/components/post/post-card-content";
import { PostFooter } from "@/components/post/post-card-footer";
import { PostHeader } from "@/components/post/post-card-header";
import { PostProvider } from "@/context/post-provider";
import { NestedPost } from "@/types/nested-posts";
interface UserPostProps {
  ancestry?: UserPostProps["post"][];
  post?: NestedPost;
}

export function UserPost({ ancestry, post }: UserPostProps) {
  if (!post && !ancestry) {
    throw new Error("Either post or ancestry must be provided");
  }

  const isFirstAndLastInThread = ancestry?.length === 2;
  console.log({ isFirstAndLastInThread });

  return (
    <>
      {ancestry?.map((ancestor, index) => (
        <PostProvider
          key={ancestor?.id}
          {...ancestor}
          isThread={ancestry?.length > 1}
          isFirstInThread={index === 0}
          isLastInThread={index === ancestry?.length - 1}
        >
          <PostCard>
            <PostHeader />
            <PostContent />
            <PostFooter />
          </PostCard>
        </PostProvider>
      ))}
      {!ancestry && (
        <PostProvider
          {...post}
          isThread={(!!post?.level && post.level > 1) || !!post?.replies?.length}
          isFirstInThread={!!post?.replies?.length && post.level === 1}
          isLastInThread={!post?.replies?.length}
        >
          <PostCard>
            <PostHeader />
            <PostContent />
            <PostFooter />
          </PostCard>
          {post?.replies && post.replies.map((reply) => <UserPost key={reply.id} post={reply} />)}
        </PostProvider>
      )}
    </>
  );
}
