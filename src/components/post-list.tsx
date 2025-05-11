"use client";

import { PostProvider } from "@/context/post-provider";
import { usePostsContext } from "@/hooks/use-posts-context";
import { PostCard } from "./post/post-card";
import { PostContent } from "./post/post-card-content";
import { PostFooter } from "./post/post-card-footer";
import { PostHeader } from "./post/post-card-header";

export function PostList() {
  const { posts } = usePostsContext();

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
