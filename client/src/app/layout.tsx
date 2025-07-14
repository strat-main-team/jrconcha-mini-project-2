import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Roboto, Inter } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Footer from "@/components/footer";
config.autoAddCss = false;

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  fallback: ["Arial", "system-ui", "sans-serif"],
});

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  fallback: ["--font-inter", "Arial", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Zeteo Blog – Just Me, Code, and Coffee",
    default: "Zeteo Blog – Just Me, Code, and Coffee",
  },
  description:
    "A personal blog sharing a humble software engineer's reflections, experiments, and lessons on his journey through the tech world — one post at a time.",
  applicationName: "Zeteo",
  openGraph: {
    title: {
      template: "%s | Zeteo Blog – Just Me, Code, and Coffee",
      default: "Zeteo Blog – Just Me, Code, and Coffee",
    },
    description:
      "A personal blog sharing a humble software engineer's reflections, experiments, and lessons on his journey through the tech world — one post at a time.",
    type: "website",
    url: `https://jrconcha-mini-project-2.vercel.app/`,
    images: [
      {
        url: `https://jrconcha-mini-project-2.vercel.app/home_page_metadata.png`,
        alt: `Image of the landing page`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      template: "%s | Zeteo Blog – Just Me, Code, and Coffee",
      default: "Zeteo Blog – Just Me, Code, and Coffee",
    },
    description:
      "A personal blog sharing a humble software engineer's reflections, experiments, and lessons on his journey through the tech world — one post at a time.",
    images: [
      `https://jrconcha-mini-project-2.vercel.app/home_page_metadata.png`,
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${roboto.className} ${inter.className}`}
    >
      <head></head>
      <body className={`antialiased `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system" /* Default theme is system preference - works by https://github.com/pacocoursey/next-themes/blob/main/next-themes/src/script.ts */
          enableSystem
          disableTransitionOnChange={false}
        >
          <Header></Header>
          {/* Dynamically calculate a value to be used as the page margin. Use clamp function min, ideal, max, where returned value is (CVW * idealValue in %) as rem.  */}
          <main className="flex flex-col justify-center mx-[0px] py-[24px] px-[24px] md:mx-[clamp(1.5rem,3vw,4rem)] md:py-[48px] md:px-[32px] lg:mx-[clamp(1.5rem,15vw,10rem)] xl:mx-[clamp(1.5rem,18vw,16rem)] 3xl:mx-[clamp(1.5rem,30vw,50rem)]">
            {children}
          </main>
          <Footer></Footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
