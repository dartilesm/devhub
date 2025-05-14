"use client";

import { usePostsContext } from "@/hooks/use-posts-context";
import { AnimatePresence, motion } from "framer-motion";
import { UserPost } from "./post/user-post";
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
            <UserPost post={post} />
          </motion.div>
        ))}
      </AnimatePresence>
      {posts.length === 0 && (
        <span className='text-center text-sm text-muted-foreground'>No posts found</span>
      )}
    </div>
  );
}
