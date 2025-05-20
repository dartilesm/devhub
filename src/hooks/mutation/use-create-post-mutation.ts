import { createPostComment, CreatePostCommentProps } from "@/actions/post-comment";
import { useUser } from "@clerk/nextjs";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useCreatePostMutation(
  useMutationProps: UseMutationOptions<
    Awaited<ReturnType<typeof createPostComment>>,
    Error,
    CreatePostCommentProps
  >,
  user: ReturnType<typeof useUser>["user"]
) {
  const mutation = useMutation({
    ...useMutationProps,
    mutationKey: ["create-post", user?.id],
    mutationFn: async function (data: CreatePostCommentProps) {
      const response = await createPostComment(data);
      return response;
    },
  });

  return mutation;
}
