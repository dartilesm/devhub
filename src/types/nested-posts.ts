import { Tables } from "database.types";

export interface NestedPost extends Partial<Tables<"posts">> {
  replies?: NestedPost[];
  level?: number;
}
