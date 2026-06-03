import type { Metadata } from "next";
import { Projects } from "@/components/shared";

export const metadata: Metadata = {
  title: "Projects & Deployments Gallery",
  description: "Browse our project portfolio of high-stress structures and critical process equipment deployed globally across chemical, pharmaceutical, and manufacturing industries.",
};

export default function Page() {
  return <Projects />;
}
