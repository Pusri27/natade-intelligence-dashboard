import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/Providers";
import { SkipLink } from "@/components/ui/Accessibility";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Natade Intelligence | AI-Powered Product Intelligence Platform",
  description:
    "Discover winning products, analyze trends, and maximize profits with Natade Intelligence - the premium dropshipping analytics platform powered by AI.",
  keywords: [
    "dropshipping",
    "product research",
    "AI analytics",
    "ecommerce",
    "trend analysis",
    "product intelligence",
  ],
  authors: [{ name: "Natade" }],
  openGraph: {
    title: "Natade Intelligence | AI-Powered Product Intelligence Platform",
    description:
      "Discover winning products, analyze trends, and maximize profits with AI-powered insights.",
    url: "https://natade.io",
    siteName: "Natade Intelligence",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Natade Intelligence",
    description: "AI-Powered Product Intelligence Platform",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          {/* Skip Link for Accessibility */}
          <SkipLink href="#main-content" />

          {/* Command Palette - Global */}
          <CommandPalette />

          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main id="main-content" className="min-h-screen" tabIndex={-1}>
            {children}
          </main>

          {/* Footer */}
          <Footer />

          {/* Noise overlay for premium feel */}
          <div className="noise pointer-events-none fixed inset-0 z-50" aria-hidden="true" />
        </Providers>
      </body>
    </html>
  );
}


