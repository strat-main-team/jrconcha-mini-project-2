import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Roboto, Inter } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
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
  title: "Zeteo – Just Me, Code, and Coffee",
  description:
    "A personal blog sharing a humble software engineer's reflections, experiments, and lessons on his journey through the tech world — one post at a time.",
  applicationName: "Zeteo",
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
      <body className={`antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system" /* Default theme is system preference - works by https://github.com/pacocoursey/next-themes/blob/main/next-themes/src/script.ts */
          enableSystem
          disableTransitionOnChange={false}
        >
          <Header></Header>
          {/* Dynamically calculate a value to be used as the page margin. Use clamp function min, ideal, max, where returned value is (CVW * idealValue in %) as rem.  */}
          <main className="">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
