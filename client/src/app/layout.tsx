import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en" suppressHydrationWarning>
      <head></head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system" /* Default theme is system preference */
          enableSystem
          disableTransitionOnChange={false}
        >
        <Header></Header>
        {/* Dynamically calculate a value to be used as the page margin. Use clamp function min, ideal, max, where returned value is (CVW * idealValue in %) as rem.  */}
        <main className="m-[clamp(1.5rem,5vw,4rem)]">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
