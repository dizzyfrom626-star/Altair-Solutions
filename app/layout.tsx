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
    "We fill your pipeline with leads and install the AI workforce to manage them. Digital marketing, agentic AI automation, and private infrastructure — fully supervised by you.",
  openGraph: {
    title: "Altair Solutions | Growth & AI Operations Partner",
    description:
      "We fill your pipeline with leads and install the AI workforce to manage them — fully supervised by you.",
    siteName: "Altair Solutions",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Altair Solutions | Growth & AI Operations Partner",
    description:
      "We fill your pipeline with leads and install the AI workforce to manage them — fully supervised by you.",
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
