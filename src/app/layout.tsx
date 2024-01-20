import type { Metadata } from "next";
import "./globals.css";
import AppHeader from "@vtapp/components/AppHeader";
import Footer from "@vtapp/components/Footer";
import dynamic from "next/dynamic";
import NextTopLoader from "nextjs-toploader";

const DynamicAnimationBackground = dynamic(
  () => import("../components/BackgroundAnimation"),
  {
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "VTAPP 2023",
  description:
    "Welcome to VTAPP 2023 - International Tech Fest by VIT AP University on December 9th & 10th, 2023.",
  openGraph: {
    type: "website",
    title: "VTAPP 2023",
    description:
      "Welcome to VTAPP 2023 - International Tech Fest by VIT AP University on December 9th & 10th, 2023.",
    url: "https://vtapp.vitap.ac.in",
    siteName: "VTAPP 2023",
    images: [
      {
        url: "https://i.imgur.com/O7EqnFl.png",
      },
    ],
  },
  twitter: {
    site: "https://vtapp.vitap.ac.in",
    title: "VTAPP 2023",
    description:
      "Welcome to VTAPP 2023 - International Tech Fest by VIT AP University on December 9th & 10th, 2023.",
    card: "summary_large_image",
    images: "https://i.imgur.com/O7EqnFl.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black min-h-screen scroll-smooth">
        <NextTopLoader />
        <DynamicAnimationBackground />
        <AppHeader />
        {/* <div className="w-full p-2 text-center bg-blue-950">
          VTAPP 2023 is postponed due to michaung cyclone dates will be announced shortly
        </div> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
