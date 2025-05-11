"use client";

import { ThoughtBox } from "@/components/thought-box";
import { Post } from "@/components/post";
import { PostThread } from "@/components/post-thread";

export default function Home() {
  function handleFollow(authorId: string) {
    console.log("Following user:", authorId);
  }

  function handleReact(postId: string, reaction: string) {
    console.log("Reaction on post:", postId, reaction);
  }

  return (
    <main className='mx-auto max-w-2xl p-4 flex flex-col gap-4'>
      <ThoughtBox />

      <PostThread>
        {/* Main post */}
        <Post
          id='1'
          author={{
            id: "user1",
            name: "John Doe",
            username: "johndoe",
            avatarUrl: "https://github.com/shadcn.png",
          }}
          content='Just launched my new project! 🚀 Really excited to share this with everyone. What do you think?'
          createdAt='2h ago'
          isThread={true}
          isFirstInThread={true}
          onFollow={handleFollow}
          onReact={handleReact}
        />

        {/* Thread replies */}
        <Post
          id='2'
          author={{
            id: "user2",
            name: "Jane Smith",
            username: "janesmith",
            avatarUrl: "https://github.com/shadcn.png",
          }}
          content="This looks amazing! The attention to detail is impressive. Can't wait to try it out! Looking forward to the next update."
          createdAt='1h ago'
          isThread={true}
          isFollowing={true}
          onFollow={handleFollow}
          onReact={handleReact}
        />

        <Post
          id='3'
          author={{
            id: "user3",
            name: "Alex Johnson",
            username: "alexj",
            avatarUrl: "https://github.com/shadcn.png",
          }}
          content='The UI is so clean and modern. Great job on the design! 👏'
          createdAt='30m ago'
          isThread={true}
          isLastInThread={true}
          onFollow={handleFollow}
          onReact={handleReact}
        />
      </PostThread>
    </main>
  );
}
