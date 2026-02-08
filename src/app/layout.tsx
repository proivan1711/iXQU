import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import ModeToggle from "@/components/ui/ModeToggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { SettingsContextProvider } from "@/features/settings/context/SettingsContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ixqu.ivanlukan.dev"),
  title: {
    default: "iXQU – Privacy-Focused Pomodoro Timer & Focus App",
    template: "%s | iXQU",
  },
  description:
    "iXQU is a modern, local-only Pomodoro timer built with Next.js. Customize work sessions (15 min–5 hours), breaks, alarms with audio, browser notifications, and track streaks/analytics offline. No tracking, no servers.",
  keywords: [
    "pomodoro timer",
    "focus app",
    "productivity timer",
    "privacy focused pomodoro",
    "browser notifications pomodoro",
    "customizable pomodoro",
  ],
  authors: [{ name: "Ivan Lukan", url: "https://ivanlukan.dev" }],
  creator: "Ivan Lukan",
  publisher: "Ivan Lukan",
  robots: "index, follow",
  alternates: {
    canonical: "https://ixqu.ivanlukan.dev",
  },
  openGraph: {
    title: "iXQU – Privacy-Focused Pomodoro Timer",
    description:
      "Boost focus with customizable Pomodoro sessions, gentle alarms, browser alerts, and local analytics. All data stays in your browser.",
    url: "https://ixqu.ivanlukan.dev",
    siteName: "iXQU",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "iXQU Pomodoro Timer Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iXQU – Privacy-Focused Pomodoro Timer",
    description:
      "Local-only focus tool with customizable timers and analytics.",
    images: ["/images/og-image.svg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  applicationName: "iXQU",
  category: "Productivity",
  verification: {
    google: "HwXn1H4t0uzy87DbT5oEDGLd1fT5tohT8hTo-GTZUkg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <SettingsContextProvider>
              <Sidebar />
              <main className="w-full h-full relative">
                <SidebarTrigger />
                <ModeToggle />
                {children}
              </main>
              <Toaster position="top-center" richColors={true} />
            </SettingsContextProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
