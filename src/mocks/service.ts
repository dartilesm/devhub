import { mockPosts, mockReactions, mockUsers } from "./data";
import { Tables } from "database.types";

const SIMULATED_DELAY = 500; // 500ms delay to simulate network latency

/**
 * Simulates a delay in the response
 */
async function delay(ms: number = SIMULATED_DELAY): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Mock service for handling user-related operations
 */
export const mockUserService = {
  async getUserByUsername(username: string) {
    await delay();
    const user = mockUsers.find((u) => u.username === username);
    return { data: user, error: null };
  },

  async updateUser(username: string, data: Partial<Tables<"users">>) {
    await delay();
    const userIndex = mockUsers.findIndex((u) => u.username === username);
    if (userIndex === -1) {
      return { data: null, error: { message: "User not found" } };
    }

    const updatedUser = { ...mockUsers[userIndex], ...data };
    mockUsers[userIndex] = updatedUser;
    return { data: updatedUser, error: null };
  },
};

/**
 * Mock service for handling post-related operations
 */
export const mockPostService = {
  async getPosts() {
    await delay();
    return { data: mockPosts, error: null };
  },

  async getPostsByUsername(username: string) {
    await delay();
    const userPosts = mockPosts.filter((post) => post.user.username === username);
    return { data: userPosts, error: null };
  },

  async createPost(data: { content: string; parent_post_id?: string | null }) {
    await delay();
    const newPost: (typeof mockPosts)[0] = {
      id: String(mockPosts.length + 1),
      content: data.content,
      created_at: new Date().toISOString(),
      parent_post_id: data.parent_post_id || null,
      user_id: "mock_user_1", // Always use the mock user
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
    };

    mockPosts.unshift(newPost);
    return { data: newPost, error: null };
  },

  async getPostThread(postId: string) {
    await delay();
    console.log("getPostThread", postId);
    const post = mockPosts.find((p) => p.id === postId);
    if (!post) {
      return { data: null, error: { message: "Post not found" } };
    }

    const ancestry = [];
    let currentPost = post;
    while (currentPost.parent_post_id) {
      const parent = mockPosts.find((p) => p.id === currentPost.parent_post_id);
      if (parent) {
        ancestry.unshift(parent);
        currentPost = parent;
      } else {
        break;
      }
    }

    const replies = mockPosts.filter((p) => p.parent_post_id === postId);

    return {
      data: {
        postAncestry: ancestry,
        directReplies: replies,
      },
      error: null,
    };
  },
};

/**
 * Mock service for handling reaction-related operations
 */
export const mockReactionService = {
  async toggleReaction(data: {
    post_id: string;
    reaction_type: Tables<"reactions">["reaction_type"];
  }) {
    await delay();
    const existingReaction = mockReactions.find(
      (r) => r.post_id === data.post_id && r.reaction_type === data.reaction_type
    );

    if (existingReaction) {
      // Remove reaction
      const index = mockReactions.indexOf(existingReaction);
      mockReactions.splice(index, 1);
      return { data: null, error: null };
    }

    // Add reaction
    const newReaction: Tables<"reactions"> = {
      id: String(mockReactions.length + 1),
      post_id: data.post_id,
      user_id: "mock_user_1", // Always use the mock user
      reaction_type: data.reaction_type,
      created_at: new Date().toISOString(),
    };

    mockReactions.push(newReaction);
    return { data: newReaction, error: null };
  },
};
