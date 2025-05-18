import React from "react";
import { Avatar } from "@heroui/react";
import { useMockUser } from "@/context/mock-auth-provider";

export function UserProfile() {
  const { user } = useMockUser();
  return (
    <div className='p-4 flex items-center space-x-3'>
      <Avatar src={user?.imageUrl} size='md' radius='full' className='border-2 border-content3' />
      <div className='flex flex-col'>
        <span className='font-medium text-sm text-content1-foreground'>{user?.fullName}</span>
        <span className='text-xs text-muted-foreground'>{user?.username}</span>
      </div>
    </div>
  );
}
