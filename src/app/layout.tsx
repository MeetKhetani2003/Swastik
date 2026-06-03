import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/shared";
import { PageTransition } from "@/components/PageTransition";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://swastikengineering.co.in'),
  title: {
    default: "Swastik Engineering | Precision Steel & Process Equipment",
    template: "%s | Swastik Engineering"
  },
  description: "Advanced pre-engineered steel buildings (PEB), heavy structural steel fabrication, and custom process equipment (reactors, storage tanks, pressure vessels) for chemical, pharmaceutical, and industrial sectors.",
  keywords: [
    "Swastik Engineering",
    "Pre-Engineered Buildings",
    "PEB Division",
    "Heavy Steel Structures",
    "Process Equipment",
    "Pressure Vessels",
    "Storage Tanks",
    "Industrial Reactors",
    "Pharmaceutical Equipment",
    "Ankleshwar GIDC",
    "Steel Fabrication India"
  ],
  authors: [{ name: "Swastik Engineering" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://swastikengineering.co.in",
    title: "Swastik Engineering | Precision Steel & Process Equipment",
    description: "Advanced pre-engineered steel buildings (PEB), heavy structural steel fabrication, and custom process equipment.",
    siteName: "Swastik Engineering"
  },
  twitter: {
    card: "summary_large_image",
    title: "Swastik Engineering | Precision Steel & Process Equipment",
    description: "Advanced pre-engineered steel buildings (PEB), heavy structural steel fabrication, and custom process equipment."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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