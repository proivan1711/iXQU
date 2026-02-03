import type {Metadata} from "next";
import {Figtree, Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import type {ReactNode} from "react";
import Sidebar from "@/components/Sidebar";
import {ThemeProvider} from "@/components/theme-provider";
import ModeToggle from "@/components/ui/ModeToggle";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {Toaster} from "@/components/ui/sonner";
import {SettingsContextProvider} from "@/features/settings/context/SettingsContext";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iXQU - flow",
  description: "A privacy-focused pomodoro timer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={figtree.variable} suppressHydrationWarning>
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
