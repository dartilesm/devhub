"use client";

import { Image } from "@heroui/image";
import { Avatar, Button, Card, Divider, Chip, Tabs, Tab } from "@heroui/react";
import {
  SiAstro,
  SiReact,
  SiVuedotjs,
  SiAstroHex,
  SiVuedotjsHex,
  SiReactHex,
} from "@icons-pack/react-simple-icons";
import { UserPost } from "@/components/post/user-post";

export default function UserPage() {
  const mockPosts = [
    {
      id: "1",
      content: "This is a sample post",
      created_at: new Date().toDateString(),
      user: {
        id: "1",
        name: "John Doe",
        username: "john_doe",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026708c",
      },
      level: 1,
      replies: [],
    },
  ];
  /* mask-image: linear-gradient(black 46%, #000000d9 80%, #00000054); */

  return (
    <div className='flex flex-col gap-4 w-full max-w-[1024px] mx-auto px-4'>
      <div className='relative'>
        <Image
          alt='Profile Cover'
          classNames={{
            wrapper: "w-full max-w-full max-w-full! aspect-[12/4] m-0",
            img: "w-full h-full object-cover object-center m-0 aspect-[11/4] h-auto rounded-t-none",
            blurredImg: "opacity-20",
          }}
          isBlurred
          src='https://heroui.com/images/album-cover.png'
        />
        <div className='absolute -bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col'>
          <Avatar
            className='w-32 h-32 text-large'
            src='https://i.pravatar.cc/150?u=a04258114e29026708c'
            isBordered
          />
          {/* <Chip variant='shadow' className='-mt-4 z-10'>
            <div className='flex flex-row gap-4 rounded-2xl p-1.5 px-2 w-fit'>
              <SiReact className='size-4 dark:text-default-900' color={SiReactHex} />
              <SiVuedotjs className='size-4 dark:text-default-900' color={SiVuedotjsHex} />
              <SiAstro className='size-4 dark:text-default-900' color={SiAstroHex} />
            </div>
          </Chip> */}
        </div>
      </div>
      {/* User's stack */}
      {/* <Chip variant='flat'>
        <div className='flex flex-row gap-2 rounded-2xl p-1.5 px-2 w-fit'>
          <SiReact className='size-4 dark:text-default-900' />
          <SiVuedotjs className='size-4 dark:text-default-900' />
          <SiAstro className='size-4 dark:text-default-900' />
          <div className='size-10 flex items-center justify-center rounded-full'>
          </div>
          <div className='size-10 flex items-center justify-center rounded-full'>
          </div>
          <div className='size-10 flex items-center justify-center rounded-full'>
          </div> 
        </div>
      </Chip> */}
      <div className='flex justify-end'>
        <Button color='primary' variant='solid'>
          Follow
        </Button>
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between items-start w-full'>
            <div className='flex flex-col gap-1'>
              <h1 className='text-2xl font-bold flex flex-row items-center'>
                <span>John Doe</span>
                <span className='flex flex-row gap-2 rounded-2xl p-1.5 px-2 w-fit'>
                  <SiReact className='size-4 dark:text-default-900' color={SiReactHex} />
                  <SiVuedotjs className='size-4 dark:text-default-900' color={SiVuedotjsHex} />
                  <SiAstro className='size-4 dark:text-default-900' color={SiAstroHex} />
                </span>
              </h1>
              <p className='text-default-500'>@john_doe</p>
            </div>
          </div>

          <p className='text-default-700'>
            Full-stack developer passionate about creating beautiful and functional web
            applications. Love to share knowledge and learn from others.
          </p>

          <div className='flex gap-8'>
            <div className='flex flex-col items-center'>
              <span className='font-bold text-large'>1.2k</span>
              <span className='text-default-500 text-sm'>Posts</span>
            </div>
            <div className='flex flex-col items-center'>
              <span className='font-bold text-large'>8.5k</span>
              <span className='text-default-500 text-sm'>Followers</span>
            </div>
            <div className='flex flex-col items-center'>
              <span className='font-bold text-large'>2.1k</span>
              <span className='text-default-500 text-sm'>Following</span>
            </div>
          </div>

          <div className='flex gap-2'>
            <Chip size='sm' variant='flat'>
              🚀 Developer
            </Chip>
            <Chip size='sm' variant='flat'>
              💻 Open Source
            </Chip>
            <Chip size='sm' variant='flat'>
              🌟 Tech Enthusiast
            </Chip>
          </div>
        </div>

        <Tabs
          aria-label='Profile sections'
          variant='bordered'
          classNames={{
            tabList: "w-full",
          }}
        >
          <Tab key='posts' title='Posts'></Tab>
          <Tab key='media' title='Media'>
            <div className='py-4'>
              <p className='text-default-500'>No media posts yet.</p>
            </div>
          </Tab>
          <Tab key='likes' title='Likes'>
            <div className='py-4'>
              <p className='text-default-500'>No liked posts yet.</p>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
