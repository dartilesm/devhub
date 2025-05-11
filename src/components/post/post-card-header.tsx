"use client";

import { usePostContext } from "@/hooks/use-post-context";
import { getRelativeTime } from "@/lib/relative-time";
import { Button, CardHeader, Tooltip } from "@heroui/react";
import Link from "next/link";

export function PostHeader() {
  const post = usePostContext();
  /* return <div>PostHeader</div>; */
  return (
    <CardHeader className='flex items-center gap-4 pb-2 flex-1'>
      <div className='flex items-center justify-between w-full'>
        <div className='flex items-center gap-1.5'>
          <Link href={`/user/${post.user.username}`} className='flex flex-row gap-2 items-center'>
            <span className='font-semibold'>
              {post.user.firstName} {post.user.lastName}
            </span>
            <span className='text-sm text-content4-foreground/50'>@{post.user.username}</span>
          </Link>
          <span className='text-sm text-content4-foreground/50'>·</span>
          <time className='text-sm text-content4-foreground/50'>
            {getRelativeTime(new Date(post.created_at))}
          </time>
        </div>

        {/* {!isFollowing && onFollow && (
        )} */}
        <Tooltip content='Watch user (Follow)'>
          <Button
            variant='bordered'
            color='primary'
            size='sm'
            /* onPress={handleFollow} */
            className='rounded-full'
          >
            Watch
          </Button>
        </Tooltip>
      </div>
    </CardHeader>
  );
}
