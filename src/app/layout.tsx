import type { Metadata } from "next";
import "../styles/globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Lunox - Software Development & AI Automation",
  description:
    "Transform your business with cutting-edge software development and AI automation services. Lunox delivers innovative SaaS solutions that drive growth and efficiency.",
  keywords:
    "software development, AI automation, SaaS, technology solutions, business automation",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Lunox - Software Development & AI Automation",
    description:
      "Transform your business with cutting-edge software development and AI automation services.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
