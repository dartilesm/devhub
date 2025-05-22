import { withAnalytics } from "@/lib/with-analytics";
import { SignUp } from "@clerk/nextjs";

function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <SignUp />
    </div>
  );
}

export default withAnalytics(SignUpPage, { event: "page-view" });
