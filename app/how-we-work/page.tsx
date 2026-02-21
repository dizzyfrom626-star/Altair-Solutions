import type { Metadata } from "next";
import HowWeWorkPageClient from "./HowWeWorkPageClient";

export const metadata: Metadata = {
  title: "How We Work | Altair Solutions",
  description:
    "From audit to autonomous in 8 weeks. A transparent three-step process: deep dive audit, build & install, and handover & training.",
  openGraph: {
    title: "How We Work | Altair Solutions",
    description:
      "Our transparent three-step process takes you from audit to fully autonomous operations in 8 weeks.",
  },
};

export default function HowWeWorkPage() {
  return <HowWeWorkPageClient />;
}
