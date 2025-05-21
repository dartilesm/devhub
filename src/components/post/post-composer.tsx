"use client";

import { useCreatePostMutation } from "@/hooks/mutation/use-create-post-mutation";
import { usePostsContext } from "@/hooks/use-posts-context";
import { cn } from "@/lib/utils";
import { NestedPost } from "@/types/nested-posts";
import { useUser } from "@clerk/nextjs";
import { Avatar, Button, Spinner, Textarea, Tooltip } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CodeIcon, ImageIcon, RocketIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export const thoughtBoxSchema = z.object({
  comment: z.string().min(1),
});

interface PostComposerProps {
  maxLength?: number;
  placeholder?: string;
  className?: string;
  postId?: string;
  onSubmit?: () => void;
}

export function PostComposer({
  placeholder = "What's on your mind?",
  className,
  postId,
  onSubmit,
}: PostComposerProps) {
  const form = useForm<z.infer<typeof thoughtBoxSchema>>({
    resolver: zodResolver(thoughtBoxSchema),
    defaultValues: {
      comment: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const { user } = useUser();
  const { addPost } = usePostsContext();
  const { mutate, isPending } = useCreatePostMutation(
    {
      onError: (error) => {
        form.setError("comment", { message: error.message });
        console.error(error);
      },
      onSettled: (response) => {
        if (response?.data) {
          const newPost: NestedPost = {
            ...response.data,
            user: {
              username: user?.username ?? "",
              display_name: `${user?.firstName || ""} ${user?.lastName || ""}`,
              image_url: user?.imageUrl ?? "",
            },
          };

          addPost(newPost);
          if (onSubmit) onSubmit();
          form.reset();
          return;
        }
        form.setError("comment", { message: response?.error.message });
        return;
      },
    },
    user
  );

  function handleOnSubmit(data: z.infer<typeof thoughtBoxSchema>) {
    if (!user) return;
    mutate({ comment: data.comment, parent_post_id: postId });
  }

  return (
    <div className={cn("space-y-2", className)}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)} className='relative'>
        <div className='absolute top-4 left-4 flex flex-row gap-2 z-10'>
          <Avatar isBordered src={user?.imageUrl} />
        </div>
        <Controller
          name='comment'
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <Textarea
              id='thought-input'
              placeholder={placeholder}
              aria-label='Share your thoughts'
              aria-describedby='char-count'
              isInvalid={!!form.formState.errors.comment}
              minRows={2}
              classNames={{
                input: "focus-visible:outline-none  resize-none pl-4",
                inputWrapper: "p-4 pb-14 pl-14",
              }}
              {...field}
            />
          )}
        />

        <div className='absolute bottom-2 w-full px-2 rounded-medium z-10 format-popup animate-in fade-in slide-in-from-bottom-2 duration-200 pl-16'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <Tooltip content='Code (coming soon)'>
                <Button isIconOnly size='sm' aria-label='Code text' variant='light'>
                  <CodeIcon className='text-medium' size={16} />
                </Button>
              </Tooltip>
              <Tooltip content='Image (coming soon)'>
                <Button isIconOnly size='sm' aria-label='Code text' variant='light'>
                  <ImageIcon className='text-medium' size={16} />
                </Button>
              </Tooltip>
            </div>
            <Button
              variant='solid'
              color='primary'
              size='sm'
              isDisabled={!form.formState.isValid || isPending}
              isLoading={isPending}
              spinner={
                <Spinner
                  classNames={{ label: "text-foreground mt-4" }}
                  variant='dots'
                  size='sm'
                  color='current'
                />
              }
              spinnerPlacement='end'
              type='submit'
            >
              Deploy comment
              {!isPending && <RocketIcon className='text-medium' size={16} />}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
