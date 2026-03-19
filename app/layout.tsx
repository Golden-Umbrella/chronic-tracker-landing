import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chronic Tracker — Stop guessing why you feel bad.",
  description:
    "Connect your Apple Watch. We find your triggers automatically. Built for people managing fibromyalgia, IBS, PCOS, migraines, lupus, ME/CFS, and more.",
  openGraph: {
    title: "Chronic Tracker — Stop guessing why you feel bad.",
    description:
      "Connect your Apple Watch. We find your triggers automatically.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
