import { useIsFollowing } from "@/hooks/use-is-following";
import { useToggleFollowMutation } from "@/hooks/mutation/use-toggle-follow-mutation";
import { useUser } from "@clerk/nextjs";
import { Button, Spinner } from "@heroui/react";
import { UserRoundMinusIcon, UserRoundPlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface FollowButtonProps {
  targetUserId: string;
  size?: "sm" | "md" | "lg";
}

export function FollowButton({ targetUserId, size = "sm" }: FollowButtonProps) {
  const { data: isFollowing, isLoading } = useIsFollowing(targetUserId);
  const toggleFollowMutation = useToggleFollowMutation();

  const [isFollowed, setIsFollowed] = useState(isFollowing);
  const { user: currentUser } = useUser();

  useEffect(() => {
    setIsFollowed(isFollowing);
  }, [isFollowing]);

  function updateFollowStatus(isFollowing: boolean) {
    setIsFollowed(isFollowing);
  }

  function handleFollowToggle() {
    setIsFollowed(!isFollowed);
    toggleFollowMutation.mutate(
      { target_user_id: targetUserId },
      {
        onSuccess(response) {
          if (!response.error) {
            updateFollowStatus(!!response.data);
          }
        },
      }
    );
  }

  if (currentUser?.id === targetUserId) return null;

  return (
    <Button
      color={isFollowed ? "default" : "primary"}
      size={size}
      variant='flat'
      onPress={handleFollowToggle}
      aria-label={isLoading ? "Loading follow status" : isFollowed ? "Unfollow" : "Follow"}
      disabled={isLoading}
    >
      {!isLoading && isFollowed && <UserRoundMinusIcon size={14} />}
      {!isLoading && !isFollowed && <UserRoundPlusIcon size={14} />}
      {isLoading ? <Spinner size='sm' variant='dots' /> : isFollowed ? "Unfollow" : "Follow"}
    </Button>
  );
}
