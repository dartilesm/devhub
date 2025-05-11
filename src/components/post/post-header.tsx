import { useFetchPost } from "@/hooks/fetch/use-fetch-post";
import { Button, CardHeader, Tooltip } from "@heroui/react";
import Link from "next/link";

export function PostHeader() {
  /* return <div>PostHeader</div>; */
  /* return (
    <CardHeader className='flex items-center gap-4 pb-2'>
      <div className='flex items-center justify-between w-full'>
        <div className='flex items-center gap-2'>
          <Link href={`/user/${author.username}`} className='flex flex-row gap-2 items-center'>
            <span className='font-semibold'>{author.name}</span>
            <span className='text-sm text-muted-foreground'>@{author.username}</span>
          </Link>
          <span className='text-sm text-muted-foreground'>·</span>
          <time className='text-sm text-muted-foreground'>{createdAt}</time>
        </div>

        {!isFollowing && onFollow && (
          <Tooltip content='Watch user (Follow)'>
            <Button
              variant='bordered'
              color='primary'
              size='sm'
              onPress={handleFollow}
              className='rounded-full'
            >
              Watch
            </Button>
          </Tooltip>
        )}
      </div>
    </CardHeader>
  ); */
}
