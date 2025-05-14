import { PostList } from "@/components/post-list";
import { ThoughtBox } from "@/components/thought-box";
import { PostContextType } from "@/context/post-provider";
import { PostsProvider } from "@/context/posts-context";
import { createServerSupabaseClient } from "@/db/supabase";

async function getPosts() {
  const supabaseClient = createServerSupabaseClient();
  const result = await supabaseClient
    .from("posts")
    .select(
      `
        id,
        content,
        created_at,
        user_id,
        user:users (
          id,
          clerk_user_id,
          username,
          display_name,
          image_url
        ),
        replies (
          id,
          content,
          created_at
        )
      `
    )
    .order("created_at", {
      ascending: false,
    })
    .order("created_at", {
      ascending: false,
      referencedTable: "replies",
    })
    .limit(10)
    .limit(10, { referencedTable: "replies" });

  return result;
}

export async function UserFeed() {
  const { data: initialPosts } = await getPosts();

  return (
    <PostsProvider initialPosts={(initialPosts as PostContextType[]) || []}>
      <div className='w-full p-4 flex flex-col gap-4'>
        <ThoughtBox />
        <PostList />
      </div>
    </PostsProvider>
  );
}
