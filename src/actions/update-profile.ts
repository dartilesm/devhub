"use server";

import { mockUserService } from "@/mocks/service";
import { Tables } from "database.types";

export type UpdateProfileData = Partial<Tables<"users">>;

export async function updateProfile(data: UpdateProfileData) {
  if (!data.username) {
    throw new Error("Username is required");
  }

  const result = await mockUserService.updateUser(data.username, data);
  console.log({ result, data });
  return result;
}
