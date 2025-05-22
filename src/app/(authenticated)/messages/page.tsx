import { notFound } from "next/navigation";
import { handleAnalytics } from "@/middleware/analytics";

export default function MessagesPage() {
  handleAnalytics();
  return notFound();
}
