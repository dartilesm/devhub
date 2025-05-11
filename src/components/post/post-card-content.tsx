"use client";

import { usePostContext } from "@/hooks/use-post-context";
import { CardBody } from "@heroui/react";

interface PostContentProps {
  children?: React.ReactNode;
}

export function PostContent({ children }: PostContentProps) {
  const post = usePostContext();
  return (
    <CardBody className='flex-1 py-0'>
      {children ?? <p className='text-sm'>{post.content}</p>}
    </CardBody>
  );
}
