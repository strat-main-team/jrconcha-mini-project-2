import { Metadata } from "next";
import BlogCard from "@/components/ui/blog-card";
import { getBlogPosts } from "@/actions/blog-post-action";
import RotatingCrossfadeBanner from "@/components/ui/banner";
import SocialLinks from "@/components/ui/socials";

export const metadata: Metadata = {
  title: "Home Page",
};

export default async function HomePage() {
  const blogPostsData = await getBlogPosts();
  const pickThreePosts = blogPostsData.slice(0, 3);
  return (
    <div className="w-full">
      <div className="w-full md:p-4">
        {/* <div className="relative h-[200px] md:h-[200px] w-full flex-col rounded-md">
          <Image
            src="/banner8.gif"
            alt={`GIF of a computer programmer`}
            width={200}
            height={200}
            className="object-contain"
          />
        </div> */}
        <RotatingCrossfadeBanner></RotatingCrossfadeBanner>
        <div className="flex flex-col py-4 mt-8">
          <p className="font-bold text-4xl md:text-5xl xl:text-5xl 3xl:text-6xl">
            Hi There!
          </p>
          <p className="font-bold text-4xl md:text-5xl xl:text-5xl 3xl:text-6xl">
            Welcome to Zeteo!
          </p>
          <p className="mt-5 text-[var(--tone-six)] md:text-lg 3xl:text-2xl">
            It&apos;s me — yes, <strong>Jhack</strong>. An aspiring{" "}
            <strong>software engineer</strong>, a lifelong{" "}
            <strong>curious learner</strong>, a passionate{" "}
            <strong>indie gamer</strong>, and someone who still believes books
            are magical.
          </p>
          <p className="mt-5 text-[var(--tone-six)] md:text-lg 3xl:text-2xl">
            I&apos;ve only recently begun my blogging journey, and I&apos;m excited (and
            slightly nervous) to be putting my thoughts out there. Expect posts
            about my ups and downs in tech, code that works (and sometimes
            doesn&apos;t), cool projects, life lessons, and a sprinkle of things I
            enjoy — from pixel-art games to productivity hacks I try (and
            sometimes abandon 😅).
          </p>
          <p className="mt-5 text-[var(--tone-six)] md:text-lg 3xl:text-2xl">
            Whether you’re a fellow dev, a student, or just someone wandering
            through —<strong>thank you</strong> for stopping by.
          </p>
          <p className="mt-5 text-[var(--tone-six)] md:text-lg 3xl:text-2xl">
            Stick around. Let&apos;s grow together. Get to know each other.
          </p>
          <p className="mt-5 text-[var(--tone-six)] italic md:text-lg 3xl:text-2xl">
            — Jhack @ Zeteo
          </p>
          <div className="flex justify-end">
            <SocialLinks></SocialLinks>
          </div>
          
        </div>
      </div>
      <div className="mt-10 md:px-4">
        <p className="text-2xl font-bold md:text-3xl 3xl:text-5xl">
          {" "}
          My Latest Articles!
        </p>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {pickThreePosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
