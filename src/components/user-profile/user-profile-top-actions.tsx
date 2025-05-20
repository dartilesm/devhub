"use client";

import { FollowButton } from "@/components/ui/follow-button";
import { useProfileContext } from "@/hooks/use-profile-context";
import { useUser } from "@clerk/nextjs";
import { Button, Tooltip } from "@heroui/react";
import { CheckIcon, Link2Icon, PencilIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import { useState } from "react";

const UserProfileEditModal = dynamic(
  () => import("./user-profile-edit-modal").then((mod) => mod.UserProfileEditModal),
  { ssr: false }
);

export function UserProfileTopActions() {
  const { user } = useUser();
  const profile = useProfileContext();
  const [isCopied, setIsCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const isCurrentUser = user?.username === profile.username;

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }

  function toggleEditProfileModal() {
    if (isCurrentUser)
      setTimeout(() => {
        // Wait for the modal to close before setting isEditing to true
        setIsEditing(!isEditing);
      }, 500);
  }

  function handleOnSave() {
    setIsEditing(false);
  }

  return (
    <div className='flex justify-end'>
      <div className='flex flex-row gap-1.5 items-center'>
        <Tooltip content={isCopied ? "Copied!" : "Copy profile link"} closeDelay={0}>
          <Button
            className='mr-2'
            variant='light'
            onPress={handleCopyLink}
            aria-label='Copy profile link'
            isIconOnly
          >
            <AnimatePresence mode='wait'>
              <motion.div
                key={isCopied ? "copied" : "copy"}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                {isCopied ? <CheckIcon size={16} /> : <Link2Icon size={16} />}
              </motion.div>
            </AnimatePresence>
          </Button>
        </Tooltip>
        {!isCurrentUser && <FollowButton targetUserId={profile.id} size='md' />}
        {isCurrentUser && (
          <Button
            variant='flat'
            color='primary'
            onPress={toggleEditProfileModal}
            startContent={<PencilIcon size={16} />}
          >
            Edit profile
          </Button>
        )}
      </div>
      {isEditing && (
        <UserProfileEditModal
          onClose={toggleEditProfileModal}
          profile={profile}
          onSave={handleOnSave}
        />
      )}
    </div>
  );
}
