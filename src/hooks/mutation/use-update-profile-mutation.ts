import { type UpdateProfileData, updateProfile } from "@/actions/update-profile";
import { type UseMutationOptions, useMutation } from "@tanstack/react-query";

export function useUpdateProfileMutation(
  useMutationProps: UseMutationOptions<
    Awaited<ReturnType<typeof updateProfile>>,
    Error,
    UpdateProfileData
  >,
) {
  const mutation = useMutation({
    ...useMutationProps,
    mutationFn: async (data: UpdateProfileData) => {
      const response = await updateProfile(data);

      if (response.error) {
        throw response.error;
      }

      return response;
    },
  });

  return mutation;
}
