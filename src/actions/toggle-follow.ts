"use server";

import { createServerSupabaseClient } from "@/db/supabase";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Tables } from "database.types";

export interface ToggleFollowData {
  target_user_id: string;
}

export async function toggleFollow({
  target_user_id,
}: ToggleFollowData): Promise<PostgrestSingleResponse<Tables<"user_followers">>> {
  const supabaseClient = createServerSupabaseClient();
  console.log("[toggleFollow] Starting follow toggle:", { target_user_id });

  const toggleFollowResult = await supabaseClient
    .rpc("toggle_follow", {
      target_user_id,
    })
    .select()
    .single();

  console.log("[toggleFollow] Toggle result:", toggleFollowResult);
  return toggleFollowResult;
}
