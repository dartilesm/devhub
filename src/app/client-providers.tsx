"use client";

import { HeroUIProvider } from "@heroui/react";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
