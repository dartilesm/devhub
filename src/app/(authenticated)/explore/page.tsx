"use client";

import { SearchBox } from "@/components/explore/search-box";
import { UserCard2 } from "@/components/explore/user-card-2";
import { PostWrapper } from "@/components/post/post-wrapper";
import { UserPost } from "@/components/post/user-post";
import { PageHeader } from "@/components/ui/page-header";
import { PostsProvider } from "@/context/posts-context";
import { exploreMockData } from "@/lib/mock/explore-data";
import { useState } from "react";

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = exploreMockData.users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.username.toLowerCase().includes(searchLower) ||
      user.display_name.toLowerCase().includes(searchLower) ||
      user.bio?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <PageHeader title='Explore'>
        <SearchBox onSearch={setSearchTerm} placeholder='Search users or posts...' />
      </PageHeader>
      <div className='w-full max-w-[1024px] mx-auto px-4 py-6 flex flex-col gap-8'>
        {/* Users Section */}
        <section className='space-y-4'>
          <h2 className='text-lg font-medium'>Users</h2>
          <div className='flex gap-4 flex-row overflow-x-auto pb-4'>
            {filteredUsers.map((user) => (
              <UserCard2 key={user.id} user={user} />
            ))}
            {filteredUsers.length === 0 && (
              <p className='text-center text-default-500'>No users found</p>
            )}
          </div>
        </section>

        {/* Posts Section */}
        <section className='space-y-4'>
          <h2 className='text-lg font-medium'>{searchTerm ? "Related Posts" : "Trending Posts"}</h2>
          <PostsProvider initialPosts={exploreMockData.posts}>
            <div className='grid gap-4'>
              {exploreMockData.posts.map((post) => (
                <PostWrapper key={post.id}>
                  <UserPost post={post} />
                </PostWrapper>
              ))}
            </div>
          </PostsProvider>
        </section>
      </div>
    </>
  );
}
