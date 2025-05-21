"use client";

import { useToggleReactionMutation } from "@/hooks/mutation/use-toggle-reaction-mutation";
import { usePostContext } from "@/hooks/use-post-context";
import { Button, CardFooter, cn, Tooltip } from "@heroui/react";
import { Tables } from "database.types";
import { ArchiveIcon, EllipsisIcon, MessageSquareIcon, Repeat2Icon, StarIcon } from "lucide-react";
import { useState } from "react";

interface Reaction {
  type: Tables<"reactions">["reaction_type"];
  icon: string;
  label: string;
}

const reactions: Reaction[] = [
  { type: "star", icon: "🌟", label: "Star (like)" },
  { type: "coffee", icon: "☕", label: "Give a coffe (support)" },
  { type: "approve", icon: "✔︎", label: "Approve (love)" },
  { type: "cache", icon: "🧠", label: "Cache (insightful)" },
];

export function PostFooter() {
  const { isThreadPagePost, togglePostModal, post, isModal } = usePostContext();
  const [selectedReaction, setSelectedReaction] = useState<Reaction["type"] | null>(
    post.reaction?.reaction_type ?? null
  );
  const [isReactionsTooltipOpen, setIsReactionsTooltipOpen] = useState(false);

  const toggleReactionMutation = useToggleReactionMutation();

  /**
   * Handles toggling a reaction on a post
   * @param reaction - The type of reaction to toggle
   */
  function handleReaction(reaction: Reaction["type"]) {
    setIsReactionsTooltipOpen(false);
    if (!post?.id) return;

    setSelectedReaction((prev) => (prev === reaction ? null : reaction));
    toggleReactionMutation.mutate({
      post_id: post.id,
      reaction_type: reaction,
    });
  }

  return (
    <>
      <CardFooter
        className={cn("z-30 flex flex-row gap-2 justify-between", {
          "px-8.5": isThreadPagePost,
        })}
      >
        {!isModal && (
          <>
            {/* Reactions */}
            <Tooltip
              className='relative mt-4 flex flex-row gap-2 rounded-full p-1'
              placement='top-start'
              content={reactions.map((reaction) => (
                <Tooltip
                  key={reaction.type}
                  className='group relative'
                  content={reaction.label}
                  onOpenChange={(open) => {
                    if (open) {
                      setIsReactionsTooltipOpen(true);
                    }
                  }}
                >
                  <Button
                    variant='light'
                    size='sm'
                    className='rounded-full p-2 hover:scale-200 transition-all duration-300'
                    isIconOnly
                    onPress={() => handleReaction(reaction.type)}
                  >
                    <span className='text-xl'>{reaction.icon}</span>
                  </Button>
                </Tooltip>
              ))}
              isOpen={isReactionsTooltipOpen}
              onOpenChange={setIsReactionsTooltipOpen}
            >
              <Button
                variant={!selectedReaction ? "light" : "faded"}
                color={!selectedReaction ? "default" : "primary"}
                size='sm'
                className='group flex items-center gap-1 rounded-full text-gray-400 hover:text-default-foreground'
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
              <Button
                variant='light'
                size='sm'
                className='rounded-full flex flex-row gap-2 text-gray-400 hover:text-default-foreground'
                onPress={() => togglePostModal(true)}
              >
                <MessageSquareIcon className='text-inherit' size={18} />
                {post?.reply_count && post?.reply_count > 0 && (
                  <span className='text-sm'>{post?.reply_count}</span>
                )}
              </Button>
            </Tooltip>
            <Tooltip content='Repost (coming soon)'>
              <Button
                variant='light'
                size='sm'
                className='rounded-full text-gray-400 hover:text-default-foreground'
              >
                <Repeat2Icon className='text-inherit' size={22} strokeWidth={1.5} />
              </Button>
            </Tooltip>
            <Tooltip content='Backup (coming soon)'>
              <Button
                variant='light'
                size='sm'
                className='rounded-full text-gray-400 hover:text-default-foreground'
              >
                <ArchiveIcon className='text-inherit' size={18} />
              </Button>
            </Tooltip>
            <Tooltip content='More (coming soon)'>
              <Button
                variant='light'
                size='sm'
                className='rounded-full text-gray-400 hover:text-default-foreground'
              >
                <EllipsisIcon className='text-inherit' size={18} />
              </Button>
            </Tooltip>
          </>
        )}
      </CardFooter>
    </>
  );
}
