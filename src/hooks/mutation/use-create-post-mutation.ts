import { type CreatePostCommentProps, createPostComment } from "@/actions/post-comment";
import type { useUser } from "@clerk/nextjs";
import { type UseMutationOptions, useMutation } from "@tanstack/react-query";

export function useCreatePostMutation(
  useMutationProps: UseMutationOptions<
    Awaited<ReturnType<typeof createPostComment>>,
    Error,
    CreatePostCommentProps
  >,
  user: ReturnType<typeof useUser>["user"],
) {
  const mutation = useMutation({
    ...useMutationProps,
    mutationKey: ["create-post", user?.id],
    mutationFn: async (data: CreatePostCommentProps) => {
      const response = await createPostComment(data);
      return response;
    },
  });

  return mutation;
}
