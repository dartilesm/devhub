import { Button } from "@heroui/react";
import { useProfileContext } from "@/hooks/use-profile-context";
import { useUser } from "@clerk/nextjs";
export function UserProfileTopActions() {
  const { user } = useUser();
  const profile = useProfileContext();
  return (
    <div className='flex justify-end'>
      <Button color='primary' variant='solid'>
        {user?.username === profile.username ? "Edit Profile" : "Follow"}
      </Button>
    </div>
  );
}
