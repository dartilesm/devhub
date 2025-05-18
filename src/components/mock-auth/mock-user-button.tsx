import { useMockAuth } from "@/context/mock-auth-provider";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { useRouter } from "next/navigation";

export function MockUserButton() {
  const { user, signOut } = useMockAuth();
  const router = useRouter();

  if (!user) return null;

  function handleSignOut() {
    signOut();
    router.push("/sign-in");
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant='ghost' className='p-0'>
          <Avatar
            src={user.imageUrl}
            size='md'
            radius='full'
            className='border-2 border-content3'
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key='sign-out' onClick={handleSignOut}>
          Sign out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
