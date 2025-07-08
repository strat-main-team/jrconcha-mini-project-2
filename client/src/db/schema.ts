import { integer, text, pgTable, timestamp } from "drizzle-orm/pg-core";

/* Uncomment once auth feature is done */
// const author = pgTable("author", {
//   id: integer()
//     .primaryKey()
//     .generatedByDefaultAsIdentity({ startWith: 0, increment: 1 }),
// });

const blogPost = pgTable("blog_post", {
  id: integer()
    .primaryKey()
    .generatedByDefaultAsIdentity({ startWith: 0, increment: 1 }), // https://stackoverflow.com/questions/55300370/postgresql-serial-vs-identity | use byDefault rather than always as it allows updating, not that it is a common use case.
  image_filename: text(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp(),
  // author_id: integer().references(() => author.id),
});

export { blogPost };
