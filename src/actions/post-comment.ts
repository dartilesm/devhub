"use server";

import { mockPostService } from "@/mocks/service";
import { Tables } from "database.types";

export interface CreatePostCommentProps {
  comment: string;
  parent_post_id?: Tables<"posts">["parent_post_id"];
}

export async function createPostComment({ comment, parent_post_id }: CreatePostCommentProps) {
  const result = await mockPostService.createPost({ content: comment, parent_post_id });
  console.log({ result });
  return result;
}
