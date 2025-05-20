"use client";

import {
  SiAstro,
  SiAstroHex,
  SiReact,
  SiReactHex,
  SiVuedotjs,
  SiVuedotjsHex,
} from "@icons-pack/react-simple-icons";
import { MapPinIcon, Link2Icon } from "lucide-react";
import { useProfileContext } from "@/hooks/use-profile-context";
import { Link } from "@heroui/react";

export function UserProfileDescription() {
  const profile = useProfileContext();
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-start w-full'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-2xl font-bold flex flex-row items-center'>
            <span>{profile.display_name}</span>
            <span className='flex flex-row gap-2 rounded-2xl p-1.5 px-2 w-fit'>
              <SiReact className='size-4 dark:text-default-900' color={SiReactHex} />
              <SiVuedotjs className='size-4 dark:text-default-900' color={SiVuedotjsHex} />
              <SiAstro className='size-4 dark:text-default-900' color={SiAstroHex} />
            </span>
          </h1>
          <p className='text-default-500'>@{profile.username}</p>
        </div>
      </div>

      <p className='text-default-700'>{profile.bio}</p>

      <div className='flex flex-col gap-3'>
        <div className='flex items-center gap-3 flex-wrap text-sm text-default-500'>
          {profile.location && (
            <div className='flex items-center gap-1.5 min-w-fit'>
              <MapPinIcon size={14} className='text-default-400 flex-shrink-0' />
              <span className='truncate'>{profile.location}</span>
            </div>
          )}
          {profile.website && (
            <Link
              href={
                profile.website.startsWith("http") ? profile.website : `https://${profile.website}`
              }
              isExternal
              showAnchorIcon
              className='text-sm'
              size='sm'
            >
              <span className='flex items-center gap-1.5'>
                <Link2Icon size={14} className='text-default-400 flex-shrink-0' />
                <span className='truncate max-w-[200px]'>
                  {profile.website.replace(/^https?:\/\//, "")}
                </span>
              </span>
            </Link>
          )}
        </div>

        <div className='flex items-center gap-3 text-sm'>
          <Link
            as='button'
            color='foreground'
            className='group flex items-center gap-1.5 hover:opacity-80 text-sm'
          >
            <span className='font-medium'>{profile.follower_count}</span>
            <span className='text-default-400'>followers</span>
          </Link>
          <div className='h-3 w-[1px] bg-default-200' />
          <Link
            as='button'
            color='foreground'
            className='group flex items-center gap-1.5 hover:opacity-80 text-sm'
          >
            <span className='font-medium'>{profile.following_count}</span>
            <span className='text-default-400'>following</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
