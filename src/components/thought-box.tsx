"use client";

import { createPostComment } from "@/actions/post-comment";
import { PostContextType } from "@/context/post-provider";
import { usePostsContext } from "@/hooks/use-posts-context";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Avatar, Button, Chip, Spinner, Textarea, Tooltip } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Tables } from "database.types";
import { CodeIcon, ImageIcon, RocketIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export const thoughtBoxSchema = z.object({
  comment: z.string().min(1),
});

interface ThoughtBoxProps {
  maxLength?: number;
  placeholder?: string;
  className?: string;
  onSubmit?: (
    data: z.infer<typeof thoughtBoxSchema>
  ) => Promise<PostgrestSingleResponse<Tables<"replies">[] | Tables<"reposts">[]>>;
}

export function ThoughtBox({
  placeholder = "What's on your mind?",
  className,
  onSubmit,
}: ThoughtBoxProps) {
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

  async function handleOnSubmit(data: z.infer<typeof thoughtBoxSchema>) {
    if (!user) return;
    if (onSubmit) {
      const result = await onSubmit(data);
      console.log(result);
      if (result.error) {
        form.setError("comment", { message: result.error.message });
        return;
      }
      return form.reset();
    }

    // Send to server first
    const { data: serverPosts, error } = await createPostComment(data);
    console.log(serverPosts);

    if (error) {
      // Handle error - show an error message
      form.setError("comment", { message: error.message });
      return;
    }

    // Only add to UI after successful server response
    if (serverPosts?.[0]) {
      const serverPost = serverPosts[0];
      const newPost: PostContextType = {
        id: serverPost.id,
        content: serverPost.content,
        created_at: serverPost.created_at,
        user_id: user.id,
        user: {
          clerk_user_id: user.id,
          username: user.username ?? "",
          display_name: user.firstName ?? "",
          image_url: user.imageUrl ?? "",
        },
      };

      addPost(newPost);
      console.log({ newPost });
      form.reset();
    }
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
              classNames={{
                input: "focus-visible:outline-none  resize-none  min-h-[60px] pl-4",
                inputWrapper: "p-4 pb-14 pl-14",
              }}
              {...field}
            />
          )}
        />

        <div className='absolute bottom-2 w-full px-2 rounded-medium z-10 format-popup animate-in fade-in slide-in-from-bottom-2 duration-200'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center gap-2'>
              <Tooltip content='Code'>
                <Button isIconOnly size='sm' aria-label='Code text' variant='light'>
                  <CodeIcon className='text-medium' size={16} />
                </Button>
              </Tooltip>
              <Tooltip content='Image'>
                <Button isIconOnly size='sm' aria-label='Code text' variant='light'>
                  <ImageIcon className='text-medium' size={16} />
                </Button>
              </Tooltip>
              <Chip
                variant='bordered'
                classNames={{
                  content: "flex flex-row items-center gap-2 text-muted-foreground text-xs",
                }}
              >
                <Icon icon='mdi:markdown' className='text-medium' />
                Markdown supported
              </Chip>
            </div>
            <Button
              variant='solid'
              color='primary'
              className='rounded-full'
              size='sm'
              isDisabled={!form.formState.isValid || form.formState.isSubmitting}
              isLoading={form.formState.isSubmitting}
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
              {!form.formState.isSubmitting && <RocketIcon className='text-medium' size={16} />}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
