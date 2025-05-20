"use server";

import { createServerSupabaseClient } from "@/db/supabase";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { Tables } from "database.types";

export interface CreatePostCommentProps {
  comment: string;
  parent_post_id?: Tables<"posts">["parent_post_id"];
}

export async function createPostComment({
  comment,
  parent_post_id,
}: CreatePostCommentProps): Promise<PostgrestSingleResponse<Tables<"posts">>> {
  const supabaseClient = createServerSupabaseClient();

  const result = await supabaseClient
    .from("posts")
    .insert({
      content: comment,
      parent_post_id,
    })
    .select()
    .single();

  console.log({ result });

  return result;
}
