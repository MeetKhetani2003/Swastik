import type { Metadata } from "next";
import { Home } from "@/components/shared";

export const metadata: Metadata = {
  title: "Swastik Engineering | Precision Steel & Process Equipment",
  description: "Advanced pre-engineered steel buildings (PEB), heavy structural steel fabrication, and custom process equipment (reactors, storage tanks, pressure vessels) for chemical, pharmaceutical, and industrial sectors.",
};

export default function Page() {
  return <Home />;
}
