"use client";

import { useMockAuth } from "@/context/mock-auth-provider";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export function MockSignIn() {
  const { signIn } = useMockAuth();
  const router = useRouter();

  function handleSignIn() {
    signIn();
    router.push("/root");
  }

  return (
    <div className='flex flex-col items-center gap-4 p-8 rounded-lg border border-content3 bg-content1'>
      <h1 className='text-2xl font-bold'>Sign In</h1>
      <p className='text-muted-foreground'>This is a mock sign-in page for demo purposes.</p>
      <Button size='lg' onClick={handleSignIn}>
        Sign in as John Doe
      </Button>
    </div>
  );
}
