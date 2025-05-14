"use client";

import { usePostContext } from "@/hooks/use-post-context";
import { cn } from "@/lib/utils";
import { Avatar } from "@heroui/react";
import Link from "next/link";

export function PostAvatarAndThreadLine() {
  const post = usePostContext();
  return (
    <div
      className={cn("flex py-4 pl-4 pr-2 justify-center relative", {
        /* "max-h-fit": isLastInThread, */
      })}
    >
      <Link href={`/@${post.user?.username}`}>
        <Avatar
          isBordered
          src={post.user?.image_url ?? ""}
          alt={post.user?.display_name ?? ""}
          className='flex-shrink-0 z-20'
        />
      </Link>
      {/* Thread Line Container */}
      {/* {isThread && (
        <div
          className={cn("absolute w-18 h-full top-0 flex items-center justify-center", {
            "top-8": isFirstInThread,
            "h-1/2": isLastInThread,
          })}
        >
          <div className='relative w-[2px] z-10 h-full'>
            <div className='absolute left-0 top-0 bottom-0 w-full bg-border/60 border border-content3' />
          </div>
        </div>
      )} */}
    </div>
  );
}
