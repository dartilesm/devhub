import { UserProfile } from "@/components/user-profile/user-profile";
import { createServerSupabaseClient } from "@/db/supabase";

async function getUserProfile(username: string) {
  const supabaseClient = createServerSupabaseClient();
  const result = await supabaseClient.from("users").select("*").eq("username", username).single();

  if (result.error) {
    console.log(result.error);
  }

  return result;
}

export default async function UserPage({ params }: { params: { username: string } }) {
  const { username } = await params;
  const formattedUsername = decodeURIComponent(username);
  const userProfile = await getUserProfile(formattedUsername.replace("@", ""));

  return <UserProfile profile={userProfile.data} />;
}
