import { UserFeed } from "@/components/containers/user-feed";
import { withAnalytics } from "@/lib/with-analytics";

export function Home() {
  return <UserFeed />;
}

export default withAnalytics(Home, { event: "page-view" });
