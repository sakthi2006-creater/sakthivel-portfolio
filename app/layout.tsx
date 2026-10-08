import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { CustomCursor } from "@/components/layout/CustomCursor";

import { CommandNavbar } from "@/components/layout/CommandNavbar";
import { AppBootstrapper } from "@/components/layout/AppBootstrapper";

export const metadata: Metadata = {
  metadataBase: new URL("https://sakthivel.com"), // Replace with your actual domain later
  title: {
    default: "Sakthivel R | Freelance Web Developer",
    template: "%s | Sakthivel R",
  },
  description:
    "Freelance web developer building modern, high-performance websites and web applications for businesses, startups, and personal brands.",
  openGraph: {
    title: "Sakthivel R | Freelance Web Developer",
    description: "Freelance web developer building modern, high-performance websites and web applications.",
    url: "https://your-domain.com", // To be replaced by the actual domain
    siteName: "Sakthivel R Portfolio",
    images: [
      {
        url: "/og-image.jpg", // The user can add their actual OG image later
        width: 1200,
        height: 630,
        alt: "Sakthivel R - Web Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sakthivel R | Freelance Web Developer",
    description: "Building modern websites and web applications.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="min-h-screen bg-background text-text-primary antialiased font-sans transition-colors duration-300">
        <ThemeProvider>
          <SmoothScrollProvider>
            <AppBootstrapper />
            <CustomCursor />
            <CommandNavbar />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

