"use server";

import { createServerSupabaseClient } from "@/db/supabase";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { Tables } from "database.types";

export type UpdateProfileData = Partial<Tables<"users">>;

export async function updateProfile(
  data: UpdateProfileData,
): Promise<PostgrestSingleResponse<Tables<"users">>> {
  if (!data.username) {
    throw new Error("Username is required");
  }

  const supabaseClient = createServerSupabaseClient();

  const result = await supabaseClient
    .from("users")
    .update({
      display_name: data.display_name,
      bio: data.bio,
      location: data.location,
      website: data.website,
      image_url: data.image_url,
    })
    .eq("username", data.username)
    .select()
    .single();
  return result;
}
