"use client";

import { PostProvider } from "@/context/post-provider";
import { usePostsContext } from "@/hooks/use-posts-context";
import { PostCard } from "./post/post-card";
import { PostContent } from "./post/post-card-content";
import { PostFooter } from "./post/post-card-footer";
import { PostHeader } from "./post/post-card-header";
import { AnimatePresence, motion } from "framer-motion";

export function PostList() {
  const { posts } = usePostsContext();

  return (
    <div className='flex flex-col gap-2'>
      <AnimatePresence mode='popLayout' initial={false}>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            layout
            initial={{ opacity: 0, y: -50 }} // Initial animation values
            animate={{ opacity: 1, y: 0 }} // Animation values when entering
            exit={{ opacity: 0, y: 50 }} // Animation values when exiting
            transition={{ duration: 0.3 }} // Animation duration
          >
            <PostProvider {...post}>
              <PostCard>
                <PostHeader />
                <PostContent />
                <PostFooter />
              </PostCard>
            </PostProvider>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
