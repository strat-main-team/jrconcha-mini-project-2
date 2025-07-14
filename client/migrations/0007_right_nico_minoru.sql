DROP TABLE "author" CASCADE;--> statement-breakpoint
DROP TABLE "likes" CASCADE;--> statement-breakpoint
ALTER TABLE "blog_post" DROP COLUMN "reading_time";--> statement-breakpoint
ALTER TABLE "comments" DROP COLUMN "parent_comment_id";