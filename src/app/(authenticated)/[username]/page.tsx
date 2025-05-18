import { UserProfile } from "@/components/user-profile/user-profile";
import { createServerSupabaseClient } from "@/db/supabase";

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

export default async function UserPage({ params }: UserPageProps) {
  const { username } = await params;
  const formattedUsername = decodeURIComponent(username);
  const userProfile = await getUserProfile(formattedUsername.replace("@", ""));

  return <UserProfile profile={userProfile.data} />;
}
