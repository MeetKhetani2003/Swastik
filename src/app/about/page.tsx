import type { Metadata } from "next";
import { About } from "@/components/shared";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Swastik Engineering, our state-of-the-art 40,000 sq ft manufacturing facility in Ankleshwar GIDC, and our mission to provide world-class steel fabrication and process equipment.",
};

export default function Page() {
  return <About />;
}
