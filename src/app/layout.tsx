import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "../styles/globals.css";
import { Header } from "@/components/Header";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

export const metadata: Metadata = {
  title: "Lunox — Software & AI Engineering Studio",
  description:
    "We design and build custom software, intelligent automation and AI-powered systems for problems that off-the-shelf software can't solve.",
  keywords:
    "software engineering, AI systems, SaaS, automation, machine learning, full-stack development",
  icons: {
    icon: "/Logo.svg",
    apple: "/Logo.svg",
  },
  openGraph: {
    title: "Lunox — Software & AI Engineering Studio",
    description:
      "We design and build custom software, intelligent automation and AI-powered systems.",
    images: ["/Logo.svg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
      >
        <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
