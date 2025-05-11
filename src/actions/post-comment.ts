"use server";

import { createServerSupabaseClient } from "@/db/supabase";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Tables } from "database.types";

export async function createPostComment({
  comment,
}: {
  comment: string;
}): Promise<PostgrestSingleResponse<Tables<"posts">[]>> {
  const supabaseClient = createServerSupabaseClient();

  const result = await supabaseClient
    .from("posts")
    .insert({
      content: comment,
    })
    .select();

  console.log({ result });

  return result;
}
