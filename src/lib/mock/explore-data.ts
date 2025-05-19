import { Tables } from "database.types";

type MockData = {
  users: Partial<Tables<"users">>[];
  posts: (Partial<Tables<"posts">> & {
    user: Partial<Tables<"users">>;
  })[];
};

export const exploreMockData: MockData = {
  users: [
    {
      id: "1",
      username: "johndoe",
      display_name: "John Doe",
      image_url: "https://i.pravatar.cc/150?u=johndoe",
      bio: "Software Engineer | Open Source Enthusiast",
      follower_count: 1200,
      following_count: 800,
    },
    {
      id: "2",
      username: "janedoe",
      display_name: "Jane Doe",
      image_url: "https://i.pravatar.cc/150?u=janedoe",
      bio: "UI/UX Designer | Creative Mind",
      follower_count: 2300,
      following_count: 1100,
    },
    {
      id: "3",
      username: "techie",
      display_name: "Tech Explorer",
      image_url: "https://i.pravatar.cc/150?u=techie",
      bio: "Tech Blogger | AI Enthusiast",
      follower_count: 5600,
      following_count: 2100,
    },
  ],
  posts: [
    {
      id: "1",
      content:
        "Just launched my new project! Check it out at https://github.com/johndoe/awesome-project",
      created_at: new Date().toISOString(),
      user_id: "1",
      parent_post_id: null,
      approve_count: 0,
      cache_count: 0,
      coffee_count: 0,
      reply_count: 0,
      repost_count: 0,
      repost_post_id: null,
      star_count: 0,
      user: {
        username: "johndoe",
        display_name: "John Doe",
        image_url: "https://i.pravatar.cc/150?u=johndoe",
      },
    },
    {
      id: "2",
      content: "Working on some exciting new UI designs. Can't wait to share them with you all! 🎨",
      created_at: new Date().toISOString(),
      user_id: "2",
      parent_post_id: null,
      approve_count: 0,
      cache_count: 0,
      coffee_count: 0,
      reply_count: 0,
      repost_count: 0,
      repost_post_id: null,
      star_count: 0,
      user: {
        username: "janedoe",
        display_name: "Jane Doe",
        image_url: "https://i.pravatar.cc/150?u=janedoe",
      },
    },
    {
      id: "3",
      content:
        "Just published a new blog post about the future of AI. What are your thoughts on AI development?",
      created_at: new Date().toISOString(),
      user_id: "3",
      parent_post_id: null,
      approve_count: 0,
      cache_count: 0,
      coffee_count: 0,
      reply_count: 0,
      repost_count: 0,
      repost_post_id: null,
      star_count: 0,
      user: {
        username: "techie",
        display_name: "Tech Explorer",
        image_url: "https://i.pravatar.cc/150?u=techie",
      },
    },
  ],
};
