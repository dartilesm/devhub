import { PostList } from "@/components/post-list";
import { ThoughtBox } from "@/components/thought-box";
import { createServerSupabaseClient } from "@/db/supabase";

export async function getPosts() {
  const supabaseClient = createServerSupabaseClient();
  const { data, error } = await supabaseClient.from("posts").select();

  if (data) return data;

  console.log({ error });
  return [];
}

export async function UserFeed() {
  const posts = await getPosts();
  console.log(posts);
  return (
    <div className='w-full p-4 flex flex-col gap-4'>
      <ThoughtBox />
      <PostList postsId={posts.map((post) => post.id)} />
    </div>
  );
}
