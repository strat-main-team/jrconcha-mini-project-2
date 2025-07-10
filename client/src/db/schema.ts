import { integer, text, pgTable, timestamp } from "drizzle-orm/pg-core";

const author = pgTable("author", {
  id: integer()
    .primaryKey()
    .generatedByDefaultAsIdentity({ startWith: 1, increment: 1 }),
});

const blogPost = pgTable("blog_post", {
  id: integer()
    .primaryKey()
    .generatedByDefaultAsIdentity({ startWith: 1, increment: 1 }), // https://stackoverflow.com/questions/55300370/postgresql-serial-vs-identity | use byDefault rather than always as it allows updating, not that it is a common use case.
  image_filename: text().notNull(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().notNull(),
  author_id: integer().references(() => author.id),
  title: text().notNull(),
  content: text().notNull(),
  description: text().notNull(),
  // reading_time:
});

export { blogPost, author };
