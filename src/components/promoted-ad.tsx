"use client";

import { Card, Image, Link } from "@heroui/react";

export function PromotedAd() {
  return (
    <Card className='p-4 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 [box-shadow:none]'>
      <div className='flex items-start justify-between mb-2'>
        <h2 className='font-medium text-lg'>Promoted</h2>
        <span className='text-xs text-default-500'>Ad</span>
      </div>
      <div className='space-y-2'>
        <Image
          src='https://midu.dev/og.jpg'
          alt='Midu.dev academy'
          className='w-full h-32 object-cover rounded-lg mb-2'
          classNames={{
            wrapper: "max-w-full!",
          }}
        />
        <h3 className='font-medium text-md'>Become a better developer with Midu.dev</h3>
        <p className='text-sm text-default-500'>
          Academy with Programming and Web Development Courses | midudev
        </p>
        <Link
          href='https://www.midu.dev/'
          isExternal
          showAnchorIcon
          className='text-sm text-primary hover:underline'
          target='_blank'
          rel='noopener noreferrer'
        >
          Join now
        </Link>
      </div>
    </Card>
  );
}
