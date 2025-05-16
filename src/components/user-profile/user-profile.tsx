"use client";

import { UserProfileContent } from "@/components/user-profile/user-profile-content";
import { UserProfileCoverAvatar } from "@/components/user-profile/user-profile-cover-avatar";
import { UserProfileDescription } from "@/components/user-profile/user-profile-description";
import { UserProfileTopActions } from "@/components/user-profile/user-profile-top-actions";
import { ProfileProvider } from "@/context/profile-provider";
import { Tables } from "database.types";
type UserProfileProps = {
  profile: Tables<"users">;
};

export function UserProfile({ profile }: UserProfileProps) {
  return (
    <ProfileProvider profile={profile}>
      <div className='flex flex-col gap-4 w-full max-w-[1024px] mx-auto px-4'>
        <UserProfileCoverAvatar />
        <UserProfileTopActions />
        <div className='flex flex-col gap-2'>
          <UserProfileDescription />

          <UserProfileContent />
        </div>
      </div>
    </ProfileProvider>
  );
}
