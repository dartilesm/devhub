import { relations } from "drizzle-orm/relations";
import { replies, posts, users, reposts, reactions, userFollowers } from "./schema";

export const repliesRelations = relations(replies, ({one, many}) => ({
	reply: one(replies, {
		fields: [replies.parentReplyId],
		references: [replies.id],
		relationName: "replies_parentReplyId_replies_id"
	}),
	replies: many(replies, {
		relationName: "replies_parentReplyId_replies_id"
	}),
	post: one(posts, {
		fields: [replies.postId],
		references: [posts.id]
	}),
	user: one(users, {
		fields: [replies.userId],
		references: [users.id]
	}),
	reposts: many(reposts),
	reactions: many(reactions),
}));

export const postsRelations = relations(posts, ({one, many}) => ({
	replies: many(replies),
	user: one(users, {
		fields: [posts.userId],
		references: [users.id]
	}),
	reposts: many(reposts),
	reactions: many(reactions),
}));

export const usersRelations = relations(users, ({many}) => ({
	replies: many(replies),
	posts: many(posts),
	reposts: many(reposts),
	reactions: many(reactions),
	userFollowers_followerId: many(userFollowers, {
		relationName: "userFollowers_followerId_users_id"
	}),
	userFollowers_userId: many(userFollowers, {
		relationName: "userFollowers_userId_users_id"
	}),
}));

export const repostsRelations = relations(reposts, ({one, many}) => ({
	post: one(posts, {
		fields: [reposts.postId],
		references: [posts.id]
	}),
	reply: one(replies, {
		fields: [reposts.replyId],
		references: [replies.id]
	}),
	user: one(users, {
		fields: [reposts.userId],
		references: [users.id]
	}),
	reactions: many(reactions),
}));

export const reactionsRelations = relations(reactions, ({one}) => ({
	post: one(posts, {
		fields: [reactions.postId],
		references: [posts.id]
	}),
	reply: one(replies, {
		fields: [reactions.replyId],
		references: [replies.id]
	}),
	repost: one(reposts, {
		fields: [reactions.repostId],
		references: [reposts.id]
	}),
	user: one(users, {
		fields: [reactions.userId],
		references: [users.id]
	}),
}));

export const userFollowersRelations = relations(userFollowers, ({one}) => ({
	user_followerId: one(users, {
		fields: [userFollowers.followerId],
		references: [users.id],
		relationName: "userFollowers_followerId_users_id"
	}),
	user_userId: one(users, {
		fields: [userFollowers.userId],
		references: [users.id],
		relationName: "userFollowers_userId_users_id"
	}),
}));