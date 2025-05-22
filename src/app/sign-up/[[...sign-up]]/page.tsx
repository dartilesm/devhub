import { SignUp } from "@clerk/nextjs";
import { withAnalytics } from "@/lib/with-analytics";

function SignUpPage() {
  return (
    <div className='flex min-h-[calc(100vh-4rem)] items-center justify-center'>
      <SignUp />
    </div>
  );
}

export default withAnalytics(SignUpPage, { event: "page-view" });
