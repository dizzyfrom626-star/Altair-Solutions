import type { Metadata } from "next";
import GrowthPageClient from "./GrowthPageClient";

export const metadata: Metadata = {
  title: "Growth Engine | Altair Solutions",
  description:
    "AI-enhanced digital marketing that generates leads and gets them on the phone — paid ads, SEO, and speed-to-lead automation by Altair Solutions.",
  openGraph: {
    title: "Growth Engine | Altair Solutions",
    description:
      "Fill your pipeline and close more deals with AI-powered lead generation, paid ads, and SEO.",
  },
};

export default function GrowthPage() {
  return <GrowthPageClient />;
}
