import { ButtonGroup } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const Button = dynamic(() => import("@heroui/react").then((mod) => mod.Button), {
  ssr: false,
});

export function SidebarThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <ButtonGroup variant="flat" size="sm">
      <Button
        isIconOnly
        color={theme === "light" ? "primary" : "default"}
        onPress={() => setTheme("light")}
      >
        <Icon icon="lucide:sun" width={16} height={16} />
      </Button>
      <Button
        isIconOnly
        color={theme === "system" ? "primary" : "default"}
        onPress={() => setTheme("system")}
      >
        <Icon icon="lucide:laptop" width={16} height={16} />
      </Button>
      <Button
        isIconOnly
        color={theme === "dark" ? "primary" : "default"}
        onPress={() => setTheme("dark")}
      >
        <Icon icon="lucide:moon" width={16} height={16} />
      </Button>
    </ButtonGroup>
  );
}
