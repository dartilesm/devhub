import { PostCard } from "@/components/post/post-card";
import { PostContent } from "@/components/post/post-card-content";
import { PostFooter } from "@/components/post/post-card-footer";
import { PostHeader } from "@/components/post/post-card-header";
import { PostWrapper } from "@/components/post/post-wrapper";
import { PostProvider, PostProviderProps } from "@/context/post-provider";

interface UserPostProps {
  post?: Omit<PostProviderProps, "children">;
  ancestry?: UserPostProps["post"][];
}

export function UserPost({ ancestry, post }: UserPostProps) {
  if (!post && !ancestry) {
    throw new Error("Either post or ancestry must be provided");
  }

  const isFirstAndLastInThread = ancestry?.length === 2;
  console.log({ isFirstAndLastInThread });

  return (
    <PostWrapper>
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
        <PostProvider {...post} isThread={false}>
          <PostCard>
            <PostHeader />
            <PostContent />
            <PostFooter />
          </PostCard>
        </PostProvider>
      )}
    </PostWrapper>
  );
}
