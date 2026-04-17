import type { Metadata } from "next";
import AutomationPageClient from "./AutomationPageClient";

export const metadata: Metadata = {
  title: "AI Teammates | Altair Solutions",
  description:
    "Custom-built AI agents that handle drafting, routing, calling, and updating — with human approval on every action that matters.",
  openGraph: {
    title: "AI Teammates | Altair Solutions",
    description:
      "Agentic AI automation with human-in-the-loop oversight. Your team's new AI coworkers.",
  },
};

export default function AutomationPage() {
  return <AutomationPageClient />;
}
