import { SignIn } from "@clerk/nextjs";
import { handleAnalytics } from "@/middleware/analytics";
export default function SignInPage() {
  handleAnalytics();
  return (
    <div className='flex min-h-[calc(100vh-4rem)] items-center justify-center'>
      <SignIn />
    </div>
  );
}
