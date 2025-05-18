import { PostComposer } from "@/components/post/post-composer";
import { PostList } from "@/components/post/post-list";
import { PostWrapper } from "@/components/post/post-wrapper";
import { UserPost } from "@/components/post/user-post";
import { PageHeader } from "@/components/ui/page-header";
import { PostsProvider } from "@/context/posts-context";
import { Tables } from "database.types";

interface PostThreadProps {
  thread: {
    postAncestry: (Tables<"posts"> & {
      user: Pick<Tables<"users">, "username" | "display_name" | "image_url">;
    })[];
    directReplies: (Tables<"posts"> & {
      user: Pick<Tables<"users">, "username" | "display_name" | "image_url">;
    })[];
  };
}

export function PostThread({ thread }: PostThreadProps) {
  const { postAncestry, directReplies } = thread;
  const currentPost = postAncestry?.at(-1);
  console.log({ postAncestry, directReplies });

  return (
    <>
      <PageHeader title='Thread' />
      <div className='flex flex-col gap-4 w-full'>
        <PostsProvider initialPosts={directReplies || []}>
          <PostWrapper isAncestry>
            <UserPost ancestry={postAncestry} />
          </PostWrapper>
          <PostComposer
            placeholder={`Reply to @${currentPost?.user?.username}`}
            postId={currentPost?.id}
          />
          <div className='flex flex-col gap-4 min-h-[100dvh]'>
            <span>Replies</span>
            {!!directReplies?.length && <PostList />}
          </div>
        </PostsProvider>
      </div>
    </>
  );
}
