import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/shared";
import { PageTransition } from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Swastik Engineering",
  description: "Advanced steel structures and intelligent process equipment manufacturing for modern industrial sectors.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-[#C9A14A]/30 selection:text-[#1F1F1F] bg-[#FAF8F3] text-[#1F1F1F] min-h-screen">
        <Header />
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}