import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CursorGlow from "@/components/CursorGlow";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Altair Solutions | Growth & AI Operations Partner",
  description:
    "AI teammates that respond to leads in seconds, handle the admin drag, and run on infrastructure you own. Agentic automation and private AI — always with a human in the loop.",
  openGraph: {
    title: "Altair Solutions | Growth & AI Operations Partner",
    description:
      "AI teammates that respond to leads in seconds, handle the admin drag, and run on infrastructure you own — always with a human in the loop.",
    siteName: "Altair Solutions",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Altair Solutions | Growth & AI Operations Partner",
    description:
      "AI teammates that respond to leads in seconds, handle the admin drag, and run on infrastructure you own — always with a human in the loop.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-background text-white antialiased font-sans overflow-x-hidden">
        <div className="noise-overlay" />
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
