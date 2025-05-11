import { Button, ButtonGroup } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTheme } from "next-themes";

export function SidebarThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  console.log(theme);

  return (
    <div className='flex items-center justify-between px-4 py-2 mx-2 my-1 rounded-full transition-colors group hover:bg-content1/80'>
      <div className='flex items-center gap-3'>
        <Icon icon='lucide:sun-moon' width={20} height={20} className='text-content2-foreground' />
        <span className='text-content2-foreground'>Theme</span>
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
