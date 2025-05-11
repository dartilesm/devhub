"use client";

import { cn } from "@/lib/utils";
import { Card } from "@heroui/react";
import { PostAvatarAndThreadLine } from "@/components/post/post-avatar-and-thread-line";
interface PostCardProps {
  children: React.ReactNode;
  className?: string;
}

export function PostCard({ children, className }: PostCardProps) {
  return (
    <Card
      className={cn(
        "relative flex flex-row dark:bg-content1 bg-[transparent] shadow-2xs",
        className
      )}
    >
      <PostAvatarAndThreadLine />
      <div className='w-full'>{children}</div>
    </Card>
  );
}
