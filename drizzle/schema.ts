import { pgTable, unique, bigint, text, timestamp, foreignKey, pgPolicy, check, primaryKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "users_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	username: text().notNull(),
	displayName: text("display_name").notNull(),
	bio: text(),
	location: text(),
	website: text(),
	joinDate: timestamp("join_date", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	unique("users_username_key").on(table.username),
]);

export const replies = pgTable("replies", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "replies_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	postId: bigint("post_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	parentReplyId: bigint("parent_reply_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	userId: bigint("user_id", { mode: "number" }),
	content: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.parentReplyId],
			foreignColumns: [table.id],
			name: "replies_parent_reply_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.postId],
			foreignColumns: [posts.id],
			name: "replies_post_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "replies_user_id_fkey"
		}).onDelete("cascade"),
	pgPolicy("Any user can see replies", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Users must insert their own replies", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Users must update their own replies", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Users must delete their own replies", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const posts = pgTable("posts", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "posts_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	userId: bigint("user_id", { mode: "number" }),
	content: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	replyIds: bigint("reply_ids", { mode: "number" }).array().default([]),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "posts_user_id_fkey"
		}).onDelete("cascade"),
	pgPolicy("Any user can see posts", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Users must insert their own posts", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Users must update their own posts", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Users must delete their own posts", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const reposts = pgTable("reposts", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "reposts_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	userId: bigint("user_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	postId: bigint("post_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	replyId: bigint("reply_id", { mode: "number" }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.postId],
			foreignColumns: [posts.id],
			name: "reposts_post_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.replyId],
			foreignColumns: [replies.id],
			name: "reposts_reply_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "reposts_user_id_fkey"
		}).onDelete("cascade"),
	unique("reposts_user_id_post_id_reply_id_key").on(table.userId, table.postId, table.replyId),
	pgPolicy("Any user can see reposts", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Users must insert their own reposts", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Users must update their own reposts", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Users must delete their own reposts", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const reactions = pgTable("reactions", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity({ name: "reactions_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	userId: bigint("user_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	postId: bigint("post_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	replyId: bigint("reply_id", { mode: "number" }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	repostId: bigint("repost_id", { mode: "number" }),
	reactionType: text("reaction_type").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.postId],
			foreignColumns: [posts.id],
			name: "reactions_post_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.replyId],
			foreignColumns: [replies.id],
			name: "reactions_reply_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.repostId],
			foreignColumns: [reposts.id],
			name: "reactions_repost_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "reactions_user_id_fkey"
		}).onDelete("cascade"),
	unique("reactions_user_id_post_id_reply_id_repost_id_reaction_type_key").on(table.userId, table.postId, table.replyId, table.repostId, table.reactionType),
	pgPolicy("Any user can see reactions", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Users must insert their own reactions", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("Users must update their own reactions", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("Users must delete their own reactions", { as: "permissive", for: "delete", to: ["authenticated"] }),
	check("reactions_reaction_type_check", sql`reaction_type = ANY (ARRAY['Like'::text, 'Love'::text, 'Fun'::text, 'Interesting'::text])`),
]);

export const userFollowers = pgTable("user_followers", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	userId: bigint("user_id", { mode: "number" }).notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	followerId: bigint("follower_id", { mode: "number" }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.followerId],
			foreignColumns: [users.id],
			name: "user_followers_follower_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "user_followers_user_id_fkey"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.userId, table.followerId], name: "user_followers_pkey"}),
]);
