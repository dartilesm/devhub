import { UserProfile } from "@/components/user-profile/user-profile";
import { createServerSupabaseClient } from "@/db/supabase";
import { notFound } from "next/navigation";
import { withAnalytics } from "@/lib/with-analytics";
async function getUserProfile(username: string) {
  const supabaseClient = createServerSupabaseClient();
  const result = await supabaseClient.from("users").select("*").eq("username", username).single();

  if (result.error) {
    console.log("Error fetching user profile", result.error);
  }

  return result;
}

interface UserPageProps {
  params: Promise<{ username: string }>;
}

async function UserPage({ params }: UserPageProps) {
  const { username } = await params;
  const formattedUsername = decodeURIComponent(username);
  const { data: userProfile, error } = await getUserProfile(formattedUsername.replace("@", ""));

  if (!userProfile || error) {
    notFound();
  }

  return <UserProfile profile={userProfile} />;
}

export default withAnalytics(UserPage, { event: "page-view" });
