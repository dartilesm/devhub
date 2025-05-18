import { Tables } from "database.types";

export const mockUsers: Tables<"users">[] = [
  {
    id: "mock_user_1",
    username: "johndoe",
    display_name: "John Doe",
    image_url: "https://avatars.githubusercontent.com/u/1?v=4",
    bio: "Senior Frontend Developer | React Expert | UI/UX Enthusiast",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    join_date: new Date().toISOString(),
  },
  {
    id: "mock_user_2",
    username: "janedoe",
    display_name: "Jane Doe",
    image_url: "https://avatars.githubusercontent.com/u/2?v=4",
    bio: "Full Stack Developer | TypeScript Lover | Open Source Contributor",
    location: "New York, NY",
    website: "https://janedoe.dev",
    join_date: new Date().toISOString(),
  },
];

type PostWithUser = Tables<"posts"> & {
  user: Pick<Tables<"users">, "username" | "display_name" | "image_url">;
  level?: number;
  replies?: PostWithUser[];
};

export const mockPosts: PostWithUser[] = [
  {
    id: "1",
    content: "Just launched my new React component library! 🚀 Check it out at https://mylib.dev",
    created_at: new Date().toISOString(),
    parent_post_id: null,
    user_id: "mock_user_1",
    approve_count: 0,
    cache_count: 0,
    coffee_count: 1,
    star_count: 2,
    level: 1,
    reply_count: 0,
    repost_count: 0,
    repost_post_id: null,
    user: {
      username: "johndoe",
      display_name: "John Doe",
      image_url: "https://avatars.githubusercontent.com/u/1?v=4",
    },
    replies: [
      {
        id: "2",
        content: "TypeScript + React is the best combination for building scalable web apps! 💪",
        created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
        parent_post_id: "1",
        user_id: "mock_user_2",
        approve_count: 1,
        cache_count: 0,
        coffee_count: 1,
        level: 2,
        star_count: 0,
        reply_count: 1,
        repost_count: 0,
        repost_post_id: null,
        user: {
          username: "janedoe",
          display_name: "Jane Doe",
          image_url: "https://avatars.githubusercontent.com/u/2?v=4",
        },
      },
    ],
  },
  {
    id: "2",
    content: "TypeScript + React is the best combination for building scalable web apps! 💪",
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    parent_post_id: "1",
    user_id: "mock_user_2",
    approve_count: 1,
    cache_count: 0,
    coffee_count: 1,
    star_count: 0,
    reply_count: 1,
    repost_count: 0,
    repost_post_id: null,
    user: {
      username: "janedoe",
      display_name: "Jane Doe",
      image_url: "https://avatars.githubusercontent.com/u/2?v=4",
    },
  },
  {
    id: "3",
    content: "Totally agree! The type safety is a game changer.",
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    parent_post_id: "2",
    user_id: "mock_user_1",
    approve_count: 0,
    cache_count: 0,
    coffee_count: 0,
    star_count: 0,
    reply_count: 0,
    repost_count: 0,
    repost_post_id: null,
    user: {
      username: "johndoe",
      display_name: "John Doe",
      image_url: "https://avatars.githubusercontent.com/u/1?v=4",
    },
  },
];

export const mockReactions: Tables<"reactions">[] = [
  {
    id: "1",
    post_id: "1",
    user_id: "mock_user_2",
    reaction_type: "star",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    post_id: "2",
    user_id: "mock_user_1",
    reaction_type: "coffee",
    created_at: new Date().toISOString(),
  },
];
