"use client";

import { PostAvatarAndThreadLine } from "@/components/post/post-avatar-and-thread-line";
import { usePostContext } from "@/hooks/use-post-context";
import { cn } from "@/lib/utils";
import { Card, CardProps } from "@heroui/react";
import { useRouter } from "next/navigation";
interface PostCardProps {
  children: React.ReactNode;
  className?: string;
  classNames?: CardProps["classNames"];
}

export function PostCard({ children, className, classNames }: PostCardProps) {
  const post = usePostContext();
  const router = useRouter();

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    // Check if the clicked element or its parents is an anchor tag
    const isAnchorElement = (event.target as HTMLElement).closest("a");
    if (isAnchorElement) return;

    router.push(`/@${post.user?.username}/thread/${post.id}`);
  }

  return (
    <div onClick={handleClick}>
      <Card
        className={cn(
          "relative flex flex-row dark:bg-content1 bg-[transparent] shadow-2xs",
          className
        )}
        classNames={classNames}
        tabIndex={0}
        role='article'
        as='article'
      >
        <PostAvatarAndThreadLine />
        <div className='w-full'>{children}</div>
      </Card>
    </div>
  );
}
