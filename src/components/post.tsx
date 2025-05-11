"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";

type Reaction = "recommend" | "funny" | "interesting" | "love" | "celebrate";

interface ReactionType {
  type: Reaction;
  icon: string;
  label: string;
}

const reactions: ReactionType[] = [
  { type: "recommend", icon: "👍", label: "Recommend" },
  { type: "funny", icon: "😄", label: "Funny" },
  { type: "interesting", icon: "🤔", label: "Interesting" },
  { type: "love", icon: "❤️", label: "Love" },
  { type: "celebrate", icon: "🎉", label: "Celebrate" },
];

interface PostProps {
  id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatarUrl: string;
  };
  content: string;
  createdAt: string;
  isFollowing?: boolean;
  isThread?: boolean;
  isFirstInThread?: boolean;
  isLastInThread?: boolean;
  onFollow?: (authorId: string) => void;
  onReact?: (postId: string, reaction: Reaction) => void;
  className?: string;
}

export function Post({
  id,
  author,
  content,
  createdAt,
  isFollowing = false,
  isThread = false,
  isFirstInThread = false,
  isLastInThread = false,
  onFollow,
  onReact,
  className,
}: PostProps) {
  const [selectedReaction, setSelectedReaction] = useState<Reaction | null>(null);
  function handleFollow() {
    onFollow?.(author.id);
  }

  function handleReaction(reaction: Reaction) {
    setSelectedReaction(reaction);
    onReact?.(id, reaction);
  }

  return (
    <Card className={cn("relative rounded-none flex flex-row", className)} as='article'>
      {/* Avatar */}
      <div
        className={cn("flex py-4 pl-4 pr-2 justify-center relative", {
          "max-h-fit": isLastInThread,
        })}
      >
        <Avatar
          isBordered
          src={author.avatarUrl}
          alt={author.name}
          className='flex-shrink-0 z-20'
        />
        {/* Thread Line Container */}
        {isThread && (
          <div
            className={cn("absolute w-18 h-full top-0 flex items-center justify-center", {
              "top-8": isFirstInThread,
              "h-1/2": isLastInThread,
            })}
          >
            <div className='relative w-[2px] z-10 h-full'>
              {/* Main vertical line */}
              <div className='absolute left-0 top-0 bottom-0 w-full bg-border/60 border border-content3' />
            </div>
          </div>
        )}
      </div>
      <div className='w-full'>
        <CardHeader className='flex items-center gap-4 pb-2'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center gap-2'>
              <span className='font-semibold'>{author.name}</span>
              <span className='text-sm text-muted-foreground'>@{author.username}</span>
              <span className='text-sm text-muted-foreground'>·</span>
              <time className='text-sm text-muted-foreground'>{createdAt}</time>
            </div>

            {!isFollowing && onFollow && (
              <Button
                variant='bordered'
                color='primary'
                size='sm'
                onPress={handleFollow}
                className='rounded-full'
              >
                Follow
              </Button>
            )}
          </div>
        </CardHeader>

        {/* Content */}
        <CardBody className='flex-1 py-0'>
          <p className='text-sm'>{content}</p>
        </CardBody>
        <CardFooter className='z-30 flex flex-row gap-2 justify-between'>
          {/* Reactions */}
          <Tooltip
            className='relative mt-4 flex flex-row gap-2 rounded-full p-1'
            placement='top-start'
            content={reactions.map((reaction) => (
              <Tooltip key={reaction.type} className='group relative' content={reaction.label}>
                <Button
                  variant='light'
                  size='sm'
                  className='rounded-full p-2 hover:scale-200 transition-all duration-300'
                  isIconOnly
                  onPress={() => handleReaction(reaction.type)}
                >
                  <span className='text-xl'>{reaction.icon}</span>
                </Button>

                {/* <span
                    className={cn(
                      "absolute -bottom-8 left-1/2 hidden -translate-x-1/2 rounded-md bg-popover px-2 py-1",
                      "text-xs font-medium text-popover-foreground group-hover:block"
                    )}
                  >
                    {reaction.label}
                  </span> */}
              </Tooltip>
            ))}
          >
            <Button
              variant={!selectedReaction ? "light" : "faded"}
              color={!selectedReaction ? "default" : "primary"}
              isIconOnly={!selectedReaction}
              size='sm'
              className='group flex items-center gap-1 rounded-full'
            >
              {selectedReaction ? (
                <span className='text-lg'>
                  {reactions.find((r) => r.type === selectedReaction)?.icon}
                </span>
              ) : (
                <Icon icon='lucide:thumbs-up' className='text-lg text-inherit' />
              )}
              {selectedReaction && <span className='text-sm capitalize'>{selectedReaction}</span>}
            </Button>
          </Tooltip>
          <Tooltip content='Reply'>
            <Button variant='light' size='sm' className='rounded-full' isIconOnly>
              <Icon icon='lucide:message-circle' className='text-lg text-inherit' />
            </Button>
          </Tooltip>
          <Tooltip content='Repost'>
            <Button variant='light' size='sm' className='rounded-full' isIconOnly>
              <Icon icon='lucide:repeat' className='text-lg text-inherit' />
            </Button>
          </Tooltip>
          <Tooltip content='Save'>
            <Button variant='light' size='sm' className='rounded-full' isIconOnly>
              <Icon icon='lucide:bookmark' className='text-lg text-inherit' />
            </Button>
          </Tooltip>
          <Tooltip content='More'>
            <Button variant='light' size='sm' className='rounded-full' isIconOnly>
              <Icon icon='lucide:ellipsis' className='text-lg text-inherit' />
            </Button>
          </Tooltip>
        </CardFooter>
      </div>
    </Card>
  );
}
