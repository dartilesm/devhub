"use client";

import { PostAvatarAndThreadLine } from "@/components/post/post-avatar-and-thread-line";
import { UserProfilePopoverCard } from "@/components/user-profile/user-profile-popover-card";
import { usePostContext } from "@/hooks/use-post-context";
import { formatDateTime } from "@/lib/format-time";
import { getRelativeTime } from "@/lib/relative-time";
import { cn } from "@/lib/utils";
import { CardHeader, Tooltip } from "@heroui/react";
import Link from "next/link";

export function PostHeader() {
  const { isThreadPagePost, post } = usePostContext();
  const { user, created_at } = post;

  return (
    <CardHeader
      className={cn("flex items-center gap-4 pb-2 flex-1", {
        "py-0 pr-8.5": isThreadPagePost,
      })}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-1.5">
          {isThreadPagePost && <PostAvatarAndThreadLine />}
          <Tooltip content={<UserProfilePopoverCard user={user} />} delay={1000}>
            <Link
              href={`/@${user?.username}`}
              className={cn("flex flex-row gap-2 items-center", {
                "flex-col gap-0 items-start": isThreadPagePost,
              })}
            >
              <span className="font-semibold">{user?.display_name}</span>
              <span className="text-sm text-content4-foreground/50">@{user?.username}</span>
            </Link>
          </Tooltip>
          {!isThreadPagePost && (
            <>
              <span className="text-sm text-content4-foreground/50">·</span>
              <time
                className="text-sm text-content4-foreground/50"
                title={formatDateTime(created_at as unknown as Date)}
              >
                {getRelativeTime(new Date(created_at as unknown as Date))}
              </time>
            </>
          )}
        </div>
      </div>
    </CardHeader>
  );
}
