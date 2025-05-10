import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "@/app/globals.css";
import { ClientProviders } from "@/app/client-providers";
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
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <ClientProviders>
            <main className='grid grid-cols-[auto_700px_auto] gap-4 px-4 mx-auto w-full max-w-7xl'>
              <div className='flex flex-col gap-4'>{/* Left sidebar */}</div>
              <div className='flex flex-col gap-4 min-h-dvh border-x border-border px-4 pt-4'>
                {children}
              </div>
              <div className='flex flex-col gap-4'>{/* Right sidebar */}</div>
            </main>
          </ClientProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
