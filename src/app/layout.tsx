import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/error-boundary";
import { SkipLinks } from "@/components/accessibility";
import { validateConfig } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProjectFlow - Project Management Dashboard",
  description: "A modern, comprehensive project management dashboard built with Next.js and TailwindCSS",
  keywords: ["project management", "dashboard", "task management", "team collaboration"],
  authors: [{ name: "ProjectFlow Team" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Validate configuration on app start
  if (typeof window === 'undefined') {
    validateConfig()
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SkipLinks />
        <ErrorBoundary>
          <div id="main-content" className="min-h-screen">
            {children}
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
