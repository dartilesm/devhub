"use server";

import { createServerSupabaseClient } from "@/db/supabase";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Tables } from "database.types";

interface CreatePostReplyProps extends Partial<Tables<"replies">> {
  comment: string;
}

export async function createPostReply({
  comment,
  post_id,
  parent_reply_id,
}: CreatePostReplyProps): Promise<PostgrestSingleResponse<Tables<"replies">[]>> {
  const supabaseClient = createServerSupabaseClient();

  const result = await supabaseClient
    .from("replies")
    .insert({
      content: comment,
      post_id,
      parent_reply_id,
    })
    .select();

  console.log({ result });

  return result;
}
