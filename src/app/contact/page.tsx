import type { Metadata } from "next";
import { Contact } from "@/components/shared";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Initialize your project with Swastik Engineering. Request quotes or inquire about pre-engineered buildings (PEB) and industrial process equipment.",
};

export default function Page() {
  return <Contact />;
}
