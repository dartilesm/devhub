"use client";

import { UserProfileDescription } from "@/components/user-profile/user-profile-description";
import { UserProfileCoverAvatar } from "@/components/user-profile/user-profile-cover-avatar";
import { UserProfileTopActions } from "@/components/user-profile/user-profile-top-actions";
import { UserProfileContent } from "@/components/user-profile/user-profile-content";
export function UserProfile() {
  return (
    <div className='flex flex-col gap-4 w-full max-w-[1024px] mx-auto px-4'>
      <UserProfileCoverAvatar />
      <UserProfileTopActions />
      <div className='flex flex-col gap-2'>
        <UserProfileDescription />

        <UserProfileContent />
      </div>
    </div>
  );
}
