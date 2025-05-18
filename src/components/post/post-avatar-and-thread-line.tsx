"use client";

import { UserProfilePopoverCard } from "@/components/user-profile/user-profile-popover-card";
import { usePostContext } from "@/hooks/use-post-context";
import { cn } from "@/lib/utils";
import { Avatar, Tooltip } from "@heroui/react";
import Link from "next/link";

export function PostAvatarAndThreadLine() {
  const { isThread, isFirstInThread, isLastInThread, isThreadPagePost, user } = usePostContext();
  return (
    <div
      className={cn("flex py-4 pl-4 pr-2 justify-center relative", {
        "pl-4.5": isThreadPagePost,
      })}
    >
      <Link href={`/@${user?.username}`}>
        <Tooltip content={<UserProfilePopoverCard user={user!} />}>
          <Avatar
            isBordered
            src={user?.image_url ?? ""}
            alt={user?.display_name ?? ""}
            className={cn("flex-shrink-0 z-20", {
              "size-9": !isThreadPagePost,
            })}
          />
        </Tooltip>
      </Link>
      {/* Thread Line Container */}
      {isThread && (
        <div
          className={cn("absolute w-18 h-full top-0 flex items-center justify-center", {
            "top-8 h-[calc(100%-2rem)]": isFirstInThread,
            "top-0 h-4": isLastInThread,
          })}
        >
          <div className='relative w-[2px] z-10 h-full'>
            <div className='absolute left-0 top-0 bottom-0 w-full bg-border/60 border border-content3' />
          </div>
        </div>
      )}
    </div>
  );
}
