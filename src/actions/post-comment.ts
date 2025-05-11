"use server";

import { createServerSupabaseClient } from "@/db/supabase";
export async function createPostComment({ comment }: { comment: string }) {
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
