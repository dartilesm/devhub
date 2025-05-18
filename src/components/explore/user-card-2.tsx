"use client";

import { ExploreUser } from "@/types/explore";
import { Avatar, Button, Card } from "@heroui/react";
import { UserPlusIcon } from "lucide-react";
import Link from "next/link";

interface UserCardProps {
  user: ExploreUser;
}

/**
 * A modern user card component with a gradient background and centered layout
 */
export function UserCard2({ user }: UserCardProps) {
  return (
    <Card className='relative rounded-xl overflow-hidden bg-gradient-to-br from-[#3360f5] via-[#033478] to-[#3c0fb0] text-white max-w-52 shrink-0'>
      {/* Content */}
      <div className='p-6 flex flex-col items-center'>
        {/* Avatar */}
        <Link href={`/@${user.username}`} className='block mb-3'>
          <Avatar src={user.image_url} alt={user.display_name} className='size-20' isBordered />
        </Link>

        {/* User info */}
        <div className='text-center mb-3'>
          <Link href={`/@${user.username}`}>
            <div className='flex items-center justify-center gap-1'>
              <h3 className='font-semibold text-md hover:underline truncate max-w-2xs'>
                {user.display_name}
              </h3>
              <span className='text-white/80 '>(@{user.username})</span>
            </div>
          </Link>
          {/* {user.bio && <p className='text-sm text-white/60 mt-1 line-clamp-2'>{user.bio}</p>} */}
        </div>

        {/* Mutual Connections */}
        <div className='flex items-center gap-2 text-xs text-white/70 mb-4'>
          <div className='flex -space-x-2'>
            {[1, 2].map((i) => (
              <div
                key={i}
                className='w-5 h-5 rounded-full border-2 border-white/20 overflow-hidden'
              >
                <Avatar
                  src={`https://i.pravatar.cc/150?u=mutual${i}`}
                  alt='Mutual connection'
                  className='w-full h-full object-cover'
                  isBordered
                />
              </div>
            ))}
          </div>
          <span>Felipe and {Math.floor(Math.random() * 100)} other mutual connections</span>
        </div>

        {/* Follow button */}
        <Button
          color='primary'
          className='w-full text-white'
          startContent={<UserPlusIcon size={16} />}
        >
          Follow
        </Button>

        {/* Stats */}
        {/* <div className='flex flex-col justify-center mt-4 text-xs text-white/70'>
          <p>
            <span className='font-semibold text-white'>{user.followers_count}</span> followers
          </p>
          <p>
            <span className='font-semibold text-white'>{user.following_count}</span> following
          </p>
        </div> */}
      </div>
    </Card>
  );
}
