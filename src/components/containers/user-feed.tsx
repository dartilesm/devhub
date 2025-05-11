import { PostList } from "@/components/post-list";
import { ThoughtBox } from "@/components/thought-box";
import { createServerSupabaseClient } from "@/db/supabase";
import { clerkClient } from "@clerk/nextjs/server";

async function getPosts() {
  const supabaseClient = createServerSupabaseClient();
  const { data, error } = await supabaseClient.from("posts").select().order("created_at", {
    ascending: false,
  });

  const clerk = await clerkClient();
  const { data: users } = await clerk.users.getUserList({
    userId: data?.map((post) => post.user_id),
  });
  console.log(users.find((user) => user.id === data?.[0].user_id));

  if (data)
    return data.map((post) => {
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

  console.log({ error });
  return [];
}

export async function UserFeed() {
  const posts = await getPosts();
  console.log(posts);
  return (
    <div className='w-full p-4 flex flex-col gap-4'>
      <ThoughtBox />
      <PostList posts={posts} />
    </div>
  );
}
