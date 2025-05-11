import { PostProvider } from "@/context/post-provider";

interface PostListProps {
  postsId: string[];
}

export function PostList({ postsId }: PostListProps) {
  return (
    <div>
      {postsId.map((postId) => (
        <PostProvider key={postId} id={postId}>
          null
        </PostProvider>
      ))}
    </div>
  );
}
