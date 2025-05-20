"use client";

import { UserPostLoading } from "@/components/loading/user-post.loading";
import { PageHeader } from "@/components/ui/page-header";
import { ProfileProvider } from "@/context/profile-provider";
import { Image, Skeleton } from "@heroui/react";
import { Tables } from "database.types";

export function UserProfileLoading() {
  return (
    <ProfileProvider profile={{} as Tables<"users">}>
      <PageHeader title='' subtitle='' />
      <div className='flex flex-col gap-4 w-full max-w-[1024px] mx-auto px-4'>
        <div>
          <Image
            alt='Profile Cover'
            classNames={{
              wrapper: "w-full max-w-full max-w-full! aspect-[12/4] m-0",
              img: "w-full h-full object-cover object-center m-0 aspect-[11/4] h-auto rounded-t-none",
              blurredImg: "opacity-20",
            }}
            isLoading
          />
          <div className='relative'>
            <div className='absolute -bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col'>
              <Skeleton className='w-32 h-32 rounded-full' />
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4 mt-24'>
        <Skeleton className='w-1/2 h-6 rounded-lg' />
        <Skeleton className='w-1/3 h-5 rounded-lg' />
        <Skeleton className='w-full h-12 rounded-lg' />
      </div>
      <div className='flex flex-col gap-4 mt-20'>
        <UserPostLoading />
        <UserPostLoading />
        <UserPostLoading />
      </div>
    </ProfileProvider>
  );
}
