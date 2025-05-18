"use server";

import { createServerSupabaseClient } from "@/db/supabase";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Tables } from "database.types";

export interface ToggleReactionData {
  post_id: string;
  reaction_type: "star" | "coffee" | "approve" | "cache";
}

export async function toggleReaction({
  post_id,
  reaction_type,
}: ToggleReactionData): Promise<PostgrestSingleResponse<Tables<"reactions">>> {
  const supabaseClient = createServerSupabaseClient();

  // First check if the reaction already exists
  const { data: existingReaction } = await supabaseClient
    .from("reactions")
    .select()
    .eq("post_id", post_id)
    .eq("reaction_type", reaction_type)
    .single();

  if (existingReaction) {
    // If reaction exists, remove it
    return supabaseClient
      .from("reactions")
      .delete()
      .eq("post_id", post_id)
      .eq("reaction_type", reaction_type)
      .select()
      .single();
  }

  // If reaction doesn't exist, create it
  return supabaseClient
    .from("reactions")
    .insert({
      post_id,
      reaction_type,
    })
    .select()
    .single();
}
