"use client";

import { PostWrapper } from "@/components/post/post-wrapper";
import { ExploreUser } from "@/types/explore";
import { Avatar, Button, Card } from "@heroui/react";
import Link from "next/link";

interface UserCardProps {
  user: ExploreUser;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <PostWrapper>
      <Card className='p-4 flex flex-row justify-between gap-4 relative dark:bg-content1 bg-[transparent] [box-shadow:none] cursor-pointer'>
        <div className='flex flex-row items-start gap-4'>
          <Link href={`/@${user.username}`} className='flex-shrink-0'>
            <Avatar isBordered src={user.image_url} alt={user.display_name} className='size-12' />
          </Link>
          <div className='flex-grow min-w-0'>
            <Link href={`/@${user.username}`} className='block'>
              <h3 className='font-semibold text-foreground truncate'>{user.display_name}</h3>
              <p className='text-sm text-default-500 truncate'>@{user.username}</p>
            </Link>
            {user.bio && <p className='text-sm text-default-500 mt-1 line-clamp-2'>{user.bio}</p>}
          </div>
        </div>
        <div className='flex-shrink-0 flex flex-col items-center gap-2'>
          <Button color='primary' variant='flat' size='sm' className='min-w-24'>
            Follow
          </Button>
          <div className='text-xs text-default-500'>
            <p>
              <span className='font-semibold text-foreground'>{user.followers_count}</span>{" "}
              followers
            </p>
            <p>
              <span className='font-semibold text-foreground'>{user.following_count}</span>{" "}
              following
            </p>
          </div>
        </div>
      </Card>
    </PostWrapper>
  );
}
