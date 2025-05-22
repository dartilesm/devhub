"use client";

import { UserCard } from "@/components/explore/user-card";
import { Card } from "@heroui/react";
import type { Tables } from "database.types";

type UserToFollowListProps = {
  users: Tables<"users">[];
};

export function UserToFollowList({ users }: UserToFollowListProps) {
  return (
    <Card className="[box-shadow:none] bg-transparent rounded-none">
      <h2 className="font-medium text-lg mb-4">Who to follow</h2>
      <div className="space-y-2">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </Card>
  );
}
