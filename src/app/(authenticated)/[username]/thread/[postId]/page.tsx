import { PostThread } from "@/components/post/post-thread";
import { mockPostService } from "@/mocks/service";
import { notFound } from "next/navigation";

interface ThreadPageProps {
  params: Promise<{
    postId: string;
  }>;
}

async function getPostData(postId: string) {
  const result = await mockPostService.getPostThread(postId);
  return result;
}

export default async function ThreadPage({ params }: ThreadPageProps) {
  const { postId } = await params;
  const thread = await getPostData(postId);

  if (!thread.data) {
    notFound();
  }

  return <PostThread thread={thread.data} />;
}
