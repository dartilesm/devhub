"use client";

import { PostWrapper } from "@/components/post/post-wrapper";
import { UserPost } from "@/components/post/user-post";
import { Tabs, Tab } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const mockPosts = [
  {
    id: "1",
    content: "This is a sample post",
    created_at: new Date().toDateString(),
    user: {
      id: "1",
      name: "John Doe",
      username: "john_doe",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026708c",
    },
    level: 1,
    replies: [],
  },
];

const enum UserProfileTabs {
  POSTS = "posts",
  MEDIA = "media",
  LIKES = "likes",
}

const tabOrder = [UserProfileTabs.POSTS, UserProfileTabs.MEDIA, UserProfileTabs.LIKES];

export function UserProfileContent() {
  const [activeTab, setActiveTab] = useState<UserProfileTabs>(UserProfileTabs.POSTS);
  const [previousTab, setPreviousTab] = useState<UserProfileTabs>(UserProfileTabs.POSTS);

  /**
   * Determines the slide direction based on the tab order
   */
  function getSlideDirection(current: UserProfileTabs, previous: UserProfileTabs) {
    const currentIndex = tabOrder.indexOf(current);
    const previousIndex = tabOrder.indexOf(previous);

    return currentIndex > previousIndex ? "right" : "left";
  }

  /**
   * Handles the tab change and updates the previous tab state
   */
  function handleTabChange(key: string | number) {
    setPreviousTab(activeTab);
    setActiveTab(key as UserProfileTabs);
  }

  const slideVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -100 : 100,
      opacity: 0,
    }),
  };

  const direction = getSlideDirection(activeTab, previousTab);

  return (
    <>
      <Tabs
        aria-label='Profile sections'
        variant='bordered'
        color='primary'
        classNames={{
          tabList: "w-full",
        }}
        selectedKey={activeTab}
        onSelectionChange={handleTabChange}
      >
        <Tab key={UserProfileTabs.POSTS} title='Posts' />
        <Tab key={UserProfileTabs.MEDIA} title='Media' />
        <Tab key={UserProfileTabs.LIKES} title='Likes' />
      </Tabs>
      <div className='py-4 overflow-hidden'>
        <AnimatePresence mode='wait' custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            variants={slideVariants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{ duration: 0.2 }}
            className='w-full'
          >
            {activeTab === UserProfileTabs.POSTS && (
              <PostWrapper>
                <UserPost post={mockPosts[0]} />
              </PostWrapper>
            )}
            {activeTab === UserProfileTabs.MEDIA && (
              <p className='text-default-500'>No media posts yet.</p>
            )}
            {activeTab === UserProfileTabs.LIKES && (
              <p className='text-default-500'>No liked posts yet.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
