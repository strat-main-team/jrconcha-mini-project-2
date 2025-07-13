import "../globals.css";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section id="blog-content" className="">
      {" "}
      <Toaster position="bottom-right" />
      {/* Dynamically calculate a value to be used as the page margin. Use clamp function min, ideal, max, where returned value is (CVW * idealValue in %) as rem.  */}
      {children}
    </section>
  );
}
