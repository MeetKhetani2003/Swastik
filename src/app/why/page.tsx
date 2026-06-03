import type { Metadata } from "next";
import { WhyPage } from "@/components/shared";

export const metadata: Metadata = {
  title: "Why Choose Swastik",
  description: "Discover the Swastik execution advantage. Learn about our end-to-end single-window solutions, advanced manufacturing scale, and 100% quality assurance model.",
};

export default function Page() {
  return <WhyPage />;
}
