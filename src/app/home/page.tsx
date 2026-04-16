import type { Metadata } from "next";
import { FishAiLanding } from "@/components/FishAiLanding";

export const metadata: Metadata = {
  title: "Fish AI — Home",
  description:
    "Discover underwater species analysis — scan and review footage (mockup).",
};

export default function HomePage() {
  return <FishAiLanding />;
}
