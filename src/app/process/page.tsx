import type { Metadata } from "next";
import { Process } from "@/components/shared";

export const metadata: Metadata = {
  title: "Industrial & Pharmaceutical Process Equipment",
  description: "High-integrity process equipment, including pressure vessels, reactors, chemical storage tanks, distillation columns, and heat exchangers built to global standards.",
};

export default function Page() {
  return <Process />;
}
