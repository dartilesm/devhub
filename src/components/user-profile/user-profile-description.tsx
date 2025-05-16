import { Chip } from "@heroui/react";
import {
  SiAstro,
  SiAstroHex,
  SiReact,
  SiReactHex,
  SiVuedotjs,
  SiVuedotjsHex,
} from "@icons-pack/react-simple-icons";

export function UserProfileDescription() {
  return (
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
        Full-stack developer passionate about creating beautiful and functional web applications.
        Love to share knowledge and learn from others.
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
  );
}
