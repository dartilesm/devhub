import { PostContextType, PostProvider } from "@/context/post-provider";
import { PostHeader } from "./post/post-card-header";
import { PostCard } from "./post/post-card";
import { PostContent } from "./post/post-card-content";
import { PostFooter } from "./post/post-card-footer";
interface PostListProps {
  posts: PostContextType[];
}

export function PostList({ posts }: PostListProps) {
  return (
    <div className='flex flex-col gap-2'>
      {posts.map((post) => (
        <PostProvider key={post.id} {...post}>
          <PostCard>
            <PostHeader />
            <PostContent />
            <PostFooter />
          </PostCard>
        </PostProvider>
      ))}
    </div>
  );
}
