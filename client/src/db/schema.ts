import { integer, text, pgTable, timestamp } from "drizzle-orm/pg-core";

const author = pgTable("author", {
  id: integer()
    .primaryKey()
    .generatedByDefaultAsIdentity({ startWith: 1, increment: 1 }),
});

const blogPost = pgTable("blog_post", {
  id: integer("id")
    .primaryKey()
    .generatedByDefaultAsIdentity({ startWith: 1, increment: 1 }), // https://stackoverflow.com/questions/55300370/postgresql-serial-vs-identity | use byDefault rather than always as it allows updating, not that it is a common use case.
  image_filename: text("image_filename").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").notNull(),
  author_id: integer("author_id").references(() => author.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  description: text("description").notNull(),
  reading_time: integer("reading_time"),
});

export { blogPost, author };
