import { MockSignIn } from "@/components/mock-auth/mock-sign-in";

export default function SignInPage() {
  return (
    <div className='flex min-h-[calc(100vh-4rem)] items-center justify-center'>
      <MockSignIn />
    </div>
  );
}
