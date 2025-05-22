"use client";

import { FollowButton } from "@/components/ui/follow-button";
import { Avatar, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import type { Tables } from "database.types";

interface UserProfilePopoverCardProps {
  user: Partial<Tables<"users">>;
}

export function UserProfilePopoverCard({ user }: UserProfilePopoverCardProps) {
  return (
    <Card className="max-w-[300px] border-none bg-transparent" shadow="none">
      <CardHeader className="justify-between flex flex-row gap-4">
        <div className="flex gap-3">
          <Avatar isBordered radius="full" size="md" src={user.image_url ?? undefined} />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {user.username}
            </h4>
            <h5 className="text-small tracking-tight text-default-500">@{user.username}</h5>
          </div>
        </div>
        <FollowButton targetUserId={user.id ?? ""} />
      </CardHeader>
      <CardBody className="px-3 py-0">
        <p className="text-small pl-px text-default-500">{user.bio}</p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-600 text-small">4</p>
          <p className=" text-default-500 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-600 text-small">97.1K</p>
          <p className="text-default-500 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
  );
}
