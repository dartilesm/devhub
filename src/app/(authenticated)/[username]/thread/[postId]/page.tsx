import { PostComposer } from "@/components/post/post-composer";
import { PostList } from "@/components/post/post-list";
import { PostWrapper } from "@/components/post/post-wrapper";
import { UserPost } from "@/components/post/user-post";
import { PageHeader } from "@/components/ui/page-header";
import { PostsProvider } from "@/context/posts-context";
import { createServerSupabaseClient } from "@/db/supabase";
import { NestedPost } from "@/types/nested-posts";

function nestReplies(posts: NestedPost[]) {
  const map = new Map();
  const roots: NestedPost[] = [];

  posts.forEach((post) => {
    post.replies = [];
    map.set(post.id, post);
  });

  posts.forEach((post) => {
    if (post.parent_post_id && map.has(post.parent_post_id)) {
      const parent = map.get(post.parent_post_id);
      parent.replies.push(post);
    } else {
      roots.push(post);
    }
  });

  return roots;
}

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
    "get_replies_to_depth",
    { target_id: postId, max_depth: 2 }
  );

  if (directRepliesError) {
    console.error("Error fetching direct replies:", directRepliesError);
  } else {
    console.log("Direct replies:", nestReplies(directReplies));
  }

  const result = {
    postAncestry,
    directReplies: nestReplies(directReplies),
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
      <PageHeader title='Thread' />
      <div className='flex flex-col gap-4 w-full'>
        <PostsProvider initialPosts={directReplies || []}>
          <PostWrapper>
            <UserPost ancestry={postAncestry} />
          </PostWrapper>
          <PostComposer
            placeholder={`Reply to @${postAncestry?.at(-1)?.user?.username}`}
            postId={postId}
          />
          <span>Replies</span>
          {!!directReplies?.length && <PostList />}
        </PostsProvider>
      </div>
    </>
  );
}
