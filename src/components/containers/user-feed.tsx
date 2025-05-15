import { PostList } from "@/components/post/post-list";
import { PostComposer } from "@/components/post/post-composer";
import { PostContextType } from "@/context/post-provider";
import { PostsProvider } from "@/context/posts-context";
import { createServerSupabaseClient } from "@/db/supabase";

async function getPosts() {
  const supabaseClient = createServerSupabaseClient();
  const result = await supabaseClient
    .from("posts")
    .select(
      `
        *,
        user:users (
          id,
          clerk_user_id,
          username,
          display_name,
          image_url
        )
      `
    )
    .is("parent_post_id", null)
    .order("created_at", {
      ascending: false,
    })
    .limit(10);

  return result;
}

export async function UserFeed() {
  const { data: initialPosts } = await getPosts();
  console.log(initialPosts);

  return (
    <PostsProvider initialPosts={(initialPosts as PostContextType[]) || []}>
      <div className='w-full p-4 flex flex-col gap-4'>
        <PostComposer />
        <PostList />
      </div>
    </PostsProvider>
  );
}
