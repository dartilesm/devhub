import { UserProfile } from "@/components/user-profile/user-profile";
import { mockUserService } from "@/mocks/service";
import { notFound } from "next/navigation";

async function getUserProfile(username: string) {
  const result = await mockUserService.getUserByUsername(username);
  return result;
}

interface UserPageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function UserPage({ params }: UserPageProps) {
  const { username } = await params;
  const formattedUsername = decodeURIComponent(username);
  const userProfile = await getUserProfile(formattedUsername.replace("@", ""));

  if (!userProfile.data) {
    notFound();
  }

  return <UserProfile profile={userProfile.data} />;
}
