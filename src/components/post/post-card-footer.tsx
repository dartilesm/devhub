"use client";

import { Button, Tooltip } from "@heroui/react";
import { useState } from "react";
import { CardFooter } from "@heroui/react";
import {
  GitPullRequestCreateIcon,
  MessageSquareIcon,
  ArchiveIcon,
  StarIcon,
  EllipsisIcon,
} from "lucide-react";
type Reaction = "star" | "coffee" | "approve" | "cache";

interface ReactionType {
  type: Reaction;
  icon: string;
  label: string;
}

const reactions: ReactionType[] = [
  { type: "star", icon: "🌟", label: "Star (like)" },
  { type: "coffee", icon: "☕", label: "Give a coffe (support)" },
  { type: "approve", icon: "✅", label: "Approve (love)" },
  { type: "cache", icon: "💾", label: "Cache (insightful)" },
];

export function PostFooter() {
  const [selectedReaction, setSelectedReaction] = useState<Reaction | null>(null);

  function handleReaction(reaction: Reaction) {
    setSelectedReaction(reaction);
  }

  return (
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
            <StarIcon className='text-inherit' size={18} />
          )}
          {selectedReaction && <span className='text-sm capitalize'>{selectedReaction}</span>}
        </Button>
      </Tooltip>
      <Tooltip content='Comment'>
        <Button variant='light' size='sm' className='rounded-full' isIconOnly>
          <MessageSquareIcon className='text-inherit' size={18} />
        </Button>
      </Tooltip>
      <Tooltip content='Clone (repost)'>
        <Button variant='light' size='sm' className='rounded-full' isIconOnly>
          <GitPullRequestCreateIcon className='text-inherit' size={18} />
        </Button>
      </Tooltip>
      <Tooltip content='Backup (Bookmark)'>
        <Button variant='light' size='sm' className='rounded-full' isIconOnly>
          <ArchiveIcon className='text-inherit' size={18} />
        </Button>
      </Tooltip>
      <Tooltip content='More'>
        <Button variant='light' size='sm' className='rounded-full' isIconOnly>
          <EllipsisIcon className='text-inherit' size={18} />
        </Button>
      </Tooltip>
    </CardFooter>
  );
}
