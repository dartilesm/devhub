"use client";

import { SidebarThemeSwitcher } from "@/components/sidebar/sidebar-theme-switcher";
import { useUser } from "@clerk/nextjs";
import {
  Avatar,
  Button,
  cn,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { SettingsIcon, SunMoonIcon } from "lucide-react";
import { useState } from "react";
import { SidebarItemProps } from "./sidebar-item";
import Link from "next/link";

type SidebarAccountDropdownProps = Pick<SidebarItemProps, "isActive" | "label">;

export function SidebarAccountDropdown({ isActive, label }: SidebarAccountDropdownProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { user } = useUser();
  return (
    <Popover isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen} placement='right-start'>
      <PopoverTrigger>
        <Button
          className={cn("flex items-center justify-between w-full", {
            "bg-content3 dark:bg-content3/50": isActive,
            "justify-center px-2 max-xl:px-0": true,
          })}
          variant='light'
          isIconOnly={true}
        >
          <div className={cn("flex items-center w-full", "max-xl:justify-center xl:gap-3")}>
            <Avatar
              src={user?.imageUrl}
              radius='full'
              className='outline-2 outline-content3 size-6'
              classNames={{
                base: "m-0",
              }}
            />
            <span
              className={cn("text-content2-foreground max-xl:hidden xl:inline", {
                "text-content1-foreground": isActive,
              })}
            >
              {label}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className='px-1 py-2 w-full max-w-56'>
          <Button
            as={Link}
            href='/account-settings'
            className='w-full justify-start'
            variant='light'
            startContent={<SettingsIcon size={18} />}
          >
            Account settings
          </Button>

          <Button
            className='w-full justify-start mt-1'
            variant='light'
            startContent={<SunMoonIcon size={18} />}
          >
            <span className='flex flex-row justify-between items-center w-full'>
              Theme <SidebarThemeSwitcher />
            </span>
          </Button>

          <Divider className='my-2' />

          <Button
            className='w-full justify-start mt-2'
            color='danger'
            variant='flat'
            startContent={<Icon icon='lucide:log-out' width={18} />}
          >
            Sign out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
