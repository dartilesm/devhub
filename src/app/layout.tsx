import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ClientProviders } from "@/app/client-providers";
import "@/app/globals.css";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevHub",
  description: "A modern development platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh`}>
        <ClerkProvider>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <ClientProviders>{children}</ClientProviders>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
