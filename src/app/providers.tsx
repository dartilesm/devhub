"use client";

import { HeroUIProvider } from "@heroui/react";
import "@/app/globals.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
