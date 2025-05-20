import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

/**
 * Fetches whether the current user is following the target user.
 * @param targetUserId - The user ID to check if followed by the current user
 * @returns {Promise<{ isFollowing: boolean }>} The follow status
 */
function fetchIsFollowing(targetUserId: string): Promise<{ isFollowing: boolean }> {
  return fetch(`/api/users/follow_status?targetUserId=${encodeURIComponent(targetUserId)}`).then(
    async (res) => {
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to fetch follow status");
      }
      return res.json();
    }
  );
}

/**
 * React Query hook to check if the current user (from Clerk) is following the target user.
 * Uses Clerk's useUser internally.
 * @param targetUserId - The target user's ID
 * @returns React Query result with isFollowing boolean
 */
export function useIsFollowing(targetUserId: string | undefined) {
  const { user: currentUser } = useUser();
  return useQuery({
    queryKey: ["isFollowing", currentUser?.id, targetUserId],
    queryFn: () => {
      if (!targetUserId) throw new Error("targetUserId is required");
      return fetchIsFollowing(targetUserId);
    },
    enabled: Boolean(currentUser?.id && targetUserId),
    select: (data) => data.isFollowing,
  });
}
