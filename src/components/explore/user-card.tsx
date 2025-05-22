"use client";

import { PostWrapper } from "@/components/post/post-wrapper";
import { FollowButton } from "@/components/ui/follow-button";
import { Tables } from "database.types";
import { Avatar, Card } from "@heroui/react";
import Link from "next/link";

interface UserCardProps {
  user: Tables<"users">;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <PostWrapper>
      <Card className='p-4 flex flex-col justify-between gap-4 relative dark:bg-content1 bg-[transparent] [box-shadow:none] cursor-pointer'>
        <div className='flex flex-row items-start gap-4'>
          <Link href={`/@${user.username}`} className='flex-shrink-0'>
            <Avatar
              isBordered
              src={user.image_url ?? undefined}
              alt={user.display_name}
              className='size-12'
            />
          </Link>
          <div className='flex-grow min-w-0 flex flex-col gap-2'>
            <div className='flex flex-row gap-2 w-full justify-between'>
              <Link href={`/@${user.username}`} className='block overflow-hidden'>
                <h3 className='font-semibold text-foreground truncate overflow-hidden'>
                  {user.display_name}
                </h3>
                <p className='text-sm text-default-500 truncate overflow-hidden'>
                  @{user.username}
                </p>
              </Link>
              <FollowButton targetUserId={user.id} className='flex-shrink-0' />
            </div>
            {user.bio && <p className='text-xs text-default-500 mt-1 line-clamp-2'>{user.bio}</p>}
          </div>
        </div>
      </Card>
    </PostWrapper>
  );
}
