import type { Metadata } from "next";
import InfrastructurePageClient from "./InfrastructurePageClient";

export const metadata: Metadata = {
  title: "Private Infrastructure | Altair Solutions",
  description:
    "On-premise AI deployment that runs on your hardware, behind your firewall. Zero vendor lock-in, zero data exposure — by Altair Solutions.",
  openGraph: {
    title: "Private Infrastructure | Altair Solutions",
    description:
      "Own your AI. Own your data. On-prem deployment with enterprise-grade security.",
  },
};

export default function InfrastructurePage() {
  return <InfrastructurePageClient />;
}
