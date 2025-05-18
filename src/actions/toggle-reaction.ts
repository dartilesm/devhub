"use server";

import { mockReactionService } from "@/mocks/service";
import { Tables } from "database.types";

export interface ToggleReactionData {
  post_id: string;
  reaction_type: Tables<"reactions">["reaction_type"];
}

export async function toggleReaction({ post_id, reaction_type }: ToggleReactionData) {
  console.log("[toggleReaction] Starting reaction toggle:", { post_id, reaction_type });

  const result = await mockReactionService.toggleReaction({ post_id, reaction_type });

  console.log("[toggleReaction] Toggle result:", result);
  return result;
}
