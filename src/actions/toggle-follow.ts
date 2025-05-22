"use server";

import { createServerSupabaseClient } from "@/db/supabase";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { Tables } from "database.types";

export interface ToggleFollowData {
  target_user_id: string;
}

export async function toggleFollow({
  target_user_id,
}: ToggleFollowData): Promise<PostgrestSingleResponse<Tables<"user_followers">>> {
  const supabaseClient = createServerSupabaseClient();

  const toggleFollowResult = await supabaseClient
    .rpc("toggle_follow", {
      target_user_id,
    })
    .select()
    .single();
  return toggleFollowResult;
}
