// export const metadata: Metadata = {
//   title: "Zeteo – Just Me, Code, and Coffee",
//   description:
//     "A personal blog sharing a humble software engineer's reflections, experiments, and lessons on his journey through the tech world — one post at a time.",
//   applicationName: "Zeteo",
// };
import "../globals.css";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section
      id="blog-content"
      className="flex flex-col justify-center mx-[0px] py-[24px] px-[24px] md:mx-[clamp(1.5rem,3vw,4rem)] md:py-[48px] md:px-[32px] lg:mx-[clamp(1.5rem,15vw,10rem)] xl:mx-[clamp(1.5rem,18vw,16rem)] 3xl:mx-[clamp(1.5rem,30vw,50rem)]"
    >
      {" "}
      <Toaster position="bottom-right"/>
      {/* Dynamically calculate a value to be used as the page margin. Use clamp function min, ideal, max, where returned value is (CVW * idealValue in %) as rem.  */}
      {children}
    </section>
  );
}
