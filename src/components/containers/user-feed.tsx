import { PostList } from "@/components/post-list";
import { ThoughtBox } from "@/components/thought-box";
import { PostContextType } from "@/context/post-provider";
import { PostsProvider } from "@/context/posts-context";
import { createServerSupabaseClient } from "@/db/supabase";
import { clerkClient } from "@clerk/nextjs/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
async function getPosts(): Promise<PostgrestSingleResponse<PostContextType[]>> {
  const supabaseClient = createServerSupabaseClient();
  const result = await supabaseClient.from("posts").select().order("created_at", {
    ascending: false,
  });

  const clerk = await clerkClient();
  const { data: users } = await clerk.users.getUserList({
    userId: result.data?.map((post) => post.user_id),
  });

  if (result.data) {
    result.data = result.data.map((post) => {
      const user = users?.find((user) => user.id === post.user_id);
      return {
        ...post,
        user: {
          id: user?.id,
          username: user?.username,
          firstName: user?.firstName,
          lastName: user?.lastName,
          imageUrl: user?.imageUrl,
        },
      };
    });
  }

  return result;
}

export async function UserFeed() {
  const { data: initialPosts } = await getPosts();

  if (!initialPosts) {
    return (
      <div className='w-full p-4 flex flex-col gap-4'>
        <ThoughtBox />
        <span className='text-center text-sm text-muted-foreground'>No posts found</span>
      </div>
    );
  }

  return (
    <PostsProvider initialPosts={initialPosts}>
      <div className='w-full p-4 flex flex-col gap-4'>
        <ThoughtBox />
        <PostList />
      </div>
    </PostsProvider>
  );
}
