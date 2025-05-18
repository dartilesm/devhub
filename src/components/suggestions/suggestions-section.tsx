"use client";

import { UserCard } from "@/components/explore/user-card";
import { exploreMockData } from "@/lib/mock/explore-data";
import { Card, Image, Link } from "@heroui/react";

/**
 * A section that displays user suggestions and promoted content
 */
export function SuggestionsSection() {
  return (
    <div className='space-y-4'>
      {/* Suggestions Card */}
      <Card className='[box-shadow:none] bg-transparent rounded-none'>
        <h2 className='font-medium text-lg mb-4'>Who to follow</h2>
        <div className='space-y-2'>
          {exploreMockData.users.slice(0, 3).map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </Card>

      {/* Promoted Content */}
      <Card className='p-4 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 [box-shadow:none]'>
        <div className='flex items-start justify-between mb-2'>
          <h2 className='font-medium text-lg'>Promoted</h2>
          <span className='text-xs text-default-500'>Ad</span>
        </div>
        <div className='space-y-2'>
          <Image
            src='https://www.heroui.com/_next/image?url=%2Fheroui-banner.png&w=750&q=100'
            alt='HeroUI Banner'
            className='w-full h-32 object-cover rounded-lg mb-2'
            classNames={{
              wrapper: "max-w-full!",
            }}
          />
          <h3 className='font-medium text-md'>Build the most beautiful apps with HeroUI</h3>
          <p className='text-sm text-default-500'>
            Beautiful, fast and modern React UI library for building accessible and customizable web
            applications.
          </p>
          <Link
            href='https://www.heroui.com/'
            isExternal
            showAnchorIcon
            className='text-sm text-primary hover:underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn more
          </Link>
        </div>
      </Card>

      {/* Footer Links */}
      <div className='text-sm text-default-500'>
        <div className='flex flex-wrap gap-2 mb-2'>
          <a href='#' className='hover:underline'>
            Terms
          </a>
          <span>·</span>
          <a href='#' className='hover:underline'>
            Privacy
          </a>
          <span>·</span>
          <a href='#' className='hover:underline'>
            Cookies
          </a>
          <span>·</span>
          <a href='#' className='hover:underline'>
            More
          </a>
        </div>
        <p>© 2024 DevHub</p>
      </div>
    </div>
  );
}
