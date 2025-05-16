import { updateProfile, UpdateProfileData } from "@/actions/update-profile";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useUpdateProfileMutation(
  useMutationProps: UseMutationOptions<
    Awaited<ReturnType<typeof updateProfile>>,
    Error,
    UpdateProfileData
  >
) {
  const mutation = useMutation({
    ...useMutationProps,
    mutationFn: async function (data: UpdateProfileData) {
      const response = await updateProfile(data);

      if (response.error) {
        throw response.error;
      }

      return response;
    },
  });

  return mutation;
}
