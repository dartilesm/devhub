import { PostCard } from "@/components/post/post-card";
import { PostContent } from "@/components/post/post-card-content";
import { PostFooter } from "@/components/post/post-card-footer";
import { PostHeader } from "@/components/post/post-card-header";
import { PostWrapper } from "@/components/post/post-wrapper";
import { PostProvider, PostProviderProps } from "@/context/post-provider";

type UserPostProps = Omit<PostProviderProps, "children">;

export function UserPost({ ...post }: UserPostProps) {
  return (
    <PostProvider {...post}>
      <PostWrapper>
        <PostCard>
          <PostHeader />
          <PostContent />
          <PostFooter />
        </PostCard>
      </PostWrapper>
    </PostProvider>
  );
}
