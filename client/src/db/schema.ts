import { integer, text, pgTable, timestamp } from "drizzle-orm/pg-core";

// const author = pgTable("author", {
//   id: integer()
//     .primaryKey()
//     .generatedByDefaultAsIdentity({ startWith: 1, increment: 1 }),
// });

const comments = pgTable("comments", {
  id: integer("id")
    .primaryKey()
    .generatedByDefaultAsIdentity({ startWith: 1, increment: 1 }),
  comment: text("comment").notNull(),
  post_id: integer("post_id")
    .references(() => blogPost.id, { onDelete: "cascade" })
    .notNull(),
  // parent_comment_id: integer("parent_comment_id"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  like_count: integer("like_count").default(0).notNull(),
});

const blogPost = pgTable("blog_post", {
  id: integer("id")
    .primaryKey()
    .generatedByDefaultAsIdentity({ startWith: 1, increment: 1 }), // https://stackoverflow.com/questions/55300370/postgresql-serial-vs-identity | use byDefault rather than always as it allows updating, not that it is a common use case.
  image_file_path: text("image_file_path").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  // author_id: integer("author_id").references(() => author.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  description: text("description").notNull(),
  // reading_time: integer("reading_time").default(0),
});

// const likes = pgTable("likes", {
//   id: integer("id")
//     .primaryKey()
//     .generatedByDefaultAsIdentity({ startWith: 1, increment: 1 }),
//   like_count: integer("like_count").default(0),
//   post_id: integer("post_id").references(() => blogPost.id, {
//     onDelete: "cascade",
//   }), // either post or comment can be null
//   comment_id: integer("comment_id").references(() => comments.id, {
//     onDelete: "cascade",
//   }),
// });

export { blogPost, comments };
