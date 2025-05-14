import { PostList } from "@/components/post-list";
import { UserPost } from "@/components/post/user-post";
import { PostsProvider } from "@/context/posts-context";
import { createServerSupabaseClient } from "@/db/supabase";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

async function getPostData(postId: string) {
  const supabaseClient = createServerSupabaseClient();

  const { data: postAncestry, error: postAncestryError } = await supabaseClient.rpc(
    "get_post_ancestry",
    {
      start_id: postId,
    }
  );

  if (postAncestryError) {
    console.error("Error fetching thread:", postAncestryError);
  } else {
    console.log("Thread (root to current):", postAncestry);
  }

  const { data: directReplies, error: directRepliesError } = await supabaseClient.rpc(
    "get_direct_replies",
    { target_id: postId }
  );

  if (directRepliesError) {
    console.error("Error fetching direct replies:", directRepliesError);
  } else {
    console.log("Direct replies:", directReplies);
  }

  const result = {
    postAncestry,
    directReplies,
  };

  return result;
}

interface ThreadPageProps {
  params: Promise<{
    username: string;
    postId: string;
  }>;
}

export default async function ThreadPage({ params }: ThreadPageProps) {
  const { postId } = await params;
  const { postAncestry, directReplies } = await getPostData(postId);

  return (
    <>
      <header className='flex flex-col sm:flex-row items-start sm:items-center mb-6 gap-2'>
        <Link href={`/root`}>
          <ArrowLeftIcon />
        </Link>
        <h1 className='text-2xl font-semibold'>Thread</h1>
      </header>
      <PostsProvider initialPosts={directReplies || []}>
        <UserPost ancestry={postAncestry} />
        <span>Replies</span>
        {!!directReplies?.length && <PostList />}
      </PostsProvider>
    </>
  );
}
