import { PostList } from "@/components/post/post-list";
import { PostComposer } from "@/components/post/post-composer";
import { PostsProvider } from "@/context/posts-context";
import { mockPostService } from "@/mocks/service";

async function getPosts() {
  const result = await mockPostService.getPosts();
  return result;
}

export async function UserFeed() {
  const posts = await getPosts();

  return (
    <PostsProvider initialPosts={posts.data}>
      <div className='w-full p-4 flex flex-col gap-4'>
        <PostComposer />
        <PostList />
      </div>
    </PostsProvider>
  );
}
