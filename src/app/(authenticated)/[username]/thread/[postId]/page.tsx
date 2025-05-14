import { PostList } from "@/components/post-list";
import { UserPost } from "@/components/post/user-post";
import { PostProviderProps } from "@/context/post-provider";
import { PostsProvider } from "@/context/posts-context";
import { createServerSupabaseClient } from "@/db/supabase";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
const selectQuery = `
        *,
        user:users (
          id,
          clerk_user_id,
          username,
          display_name,
          image_url
        ),
        replies (
          *,
          user:users (
            id,
            clerk_user_id,
            username,
            display_name,
            image_url
          )
        )
      `;

async function getPostData(postId: string) {
  const supabaseClient = createServerSupabaseClient();
  const postResult = await supabaseClient
    .from("posts")
    .select(selectQuery)
    .eq("id", postId)
    .single()
    .overrideTypes<Omit<PostProviderProps, "children">>();

  if (postResult.data) return postResult;

  const repliesResult = await supabaseClient
    .from("replies")
    .select(selectQuery)
    .eq("id", postId)
    .single()
    .overrideTypes<Omit<PostProviderProps, "children">>();

  return repliesResult;
}

interface ThreadPageProps {
  params: Promise<{
    username: string;
    postId: string;
  }>;
}

export default async function ThreadPage({ params }: ThreadPageProps) {
  const { postId } = await params;
  const { data: post } = await getPostData(postId);
  console.log(post);
  return (
    <>
      <header className='flex flex-col sm:flex-row items-start sm:items-center mb-6 gap-2'>
        <Link href={`/root`}>
          <ArrowLeftIcon />
        </Link>
        <h1 className='text-2xl font-semibold'>Thread</h1>
      </header>
      <PostsProvider initialPosts={post?.replies || []}>
        <UserPost {...post} />
        {!!post?.replies?.length && <PostList />}
      </PostsProvider>
    </>
  );
}
