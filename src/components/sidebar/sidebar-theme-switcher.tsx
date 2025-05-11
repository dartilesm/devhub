import { ButtonGroup } from "@heroui/react";
import { Icon } from "@iconify/react";
import { SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const Button = dynamic(() => import("@heroui/react").then((mod) => mod.Button), {
  ssr: false,
});

export function SidebarThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className='flex items-center justify-between px-4 py-2 mx-2 my-1 rounded-full transition-colors group hover:bg-content1/80'>
      <div className='flex justify-between w-full'>
        <div className='flex items-center gap-3'>
          <SunMoonIcon />
          <span className='text-content2-foreground'>Theme</span>
        </div>
        <ButtonGroup variant='flat' size='sm'>
          <Button
            isIconOnly
            color={theme === "light" ? "primary" : "default"}
            onPress={() => setTheme("light")}
          >
            <Icon icon='lucide:sun' width={16} height={16} />
          </Button>
          <Button
            isIconOnly
            color={theme === "system" ? "primary" : "default"}
            onPress={() => setTheme("system")}
          >
            <Icon icon='lucide:laptop' width={16} height={16} />
          </Button>
          <Button
            isIconOnly
            color={theme === "dark" ? "primary" : "default"}
            onPress={() => setTheme("dark")}
          >
            <Icon icon='lucide:moon' width={16} height={16} />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
