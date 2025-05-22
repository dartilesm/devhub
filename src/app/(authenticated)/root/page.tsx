import { UserFeed } from "@/components/containers/user-feed";
import { handleAnalytics } from "@/middleware/analytics";

export default function Home() {
  handleAnalytics();
  return <UserFeed />;
}
