"use client";

import { ProfileContext } from "@/context/profile-provider";
import { useContext } from "react";
/**
 * Hook to access the profile context
 */
export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
}
