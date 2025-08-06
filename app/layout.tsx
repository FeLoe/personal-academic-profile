// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dr. Felicia Loecherbach",
  description:
    "Assistant Professor Political Communication and Journalism - University of Amsterdam",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
    ],
  },
  openGraph: {
    title: "Dr. Felicia Loecherbach",
    description:
      "Assistant Professor Political Communication and Journalism - University of Amsterdam",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Dr. Felicia Loecherbach",
    description:
      "Assistant Professor Political Communication and Journalism - University of Amsterdam",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
