import { ExploreView } from "@/components/containers/explore-view";
import { handleAnalytics } from "@/middleware/analytics";

export default function ExplorePage() {
  handleAnalytics();

  return <ExploreView />;
}
