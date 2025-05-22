import type { Tables } from "database.types";

export interface ExploreUser {
  id: string;
  username: string;
  display_name: string;
  image_url: string;
  bio?: string;
  followers_count: number;
  following_count: number;
}

export interface ExploreMockData {
  users: ExploreUser[];
  posts: Array<
    Tables<"posts"> & {
      user: Partial<Tables<"users">>;
    }
  >;
}
