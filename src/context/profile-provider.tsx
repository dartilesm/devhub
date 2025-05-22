"use client";

import type { Tables } from "database.types";
import { createContext } from "react";

type ProfileProviderProps = {
  children: React.ReactNode;
  profile: Tables<"users">;
};

export const ProfileContext = createContext<Tables<"users"> | null>(null);

export function ProfileProvider({ children, profile }: ProfileProviderProps) {
  return <ProfileContext.Provider value={profile}>{children}</ProfileContext.Provider>;
}
