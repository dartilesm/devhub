"use client";

import { createPostComment } from "@/actions/post-comment";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Avatar, Button, Chip, Spinner, Textarea, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Controller, useForm } from "react-hook-form";
import { CodeIcon, ImageIcon, RocketIcon } from "lucide-react";
interface FormData {
  comment: string;
}

interface ThoughtBoxProps {
  maxLength?: number;
  placeholder?: string;
  className?: string;
  onSubmit?: (thought: string) => void;
}

export function ThoughtBox({ placeholder = "What's on your mind?", className }: ThoughtBoxProps) {
  const form = useForm<FormData>();
  const { user } = useUser();

  async function onSubmit(data: FormData) {
    const { error } = await createPostComment(data);

    if (error) return;
    form.reset();
  }

  return (
    <div className={cn("space-y-2", className)}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='relative'>
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
              classNames={{
                input: "pb-10 focus-visible:outline-none pl-14 resize-none  min-h-[100px]",
                inputWrapper:
                  "p-4 bg-default-300/30 data-[hover=true]:bg-default-300/50 data-[focus=true]:bg-default-300/30",
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
              isDisabled={!form.formState.isValid && form.formState.isSubmitting}
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
