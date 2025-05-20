"use client";

import { SidebarItem } from "./sidebar-item";
import { SidebarSection } from "./sidebar-section";
import { UserProfile } from "./user-profile";
import { SidebarThemeSwitcher } from "@/components/sidebar/sidebar-theme-switcher";
import { useUser } from "@clerk/nextjs";
import { HomeIcon, MessageSquareIcon, TelescopeIcon, TriangleIcon, UserIcon } from "lucide-react";
import { usePathname } from "next/navigation";
export function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  return (
    <div className='h-full flex flex-col max-w-64'>
      <div className='p-4 flex items-center gap-2'>
        <div className='w-8 h-8 rounded-full bg-content1 flex items-center justify-center'>
          <TriangleIcon className='text-content1-foreground' size={18} />
        </div>
        <span className='font-medium text-content1-foreground text-lg'>ByteBuzz</span>
      </div>

      <div className='flex-1 overflow-y-auto justify-center flex flex-col'>
        <SidebarSection title=''>
          <SidebarItem
            to='/root'
            icon={<HomeIcon />}
            label='Root'
            isActive={pathname === "/root"}
          />
          <SidebarItem
            to='/explore'
            icon={<TelescopeIcon />}
            label='Explore'
            isActive={pathname === "/explore"}
          />
          <SidebarItem
            to='/messages'
            icon={<MessageSquareIcon />}
            label='Messages'
            isActive={pathname === "/messages"}
          />
          <SidebarItem
            to={`/@${user?.username}`}
            icon={<UserIcon />}
            label='Profile'
            isActive={pathname === `/@${user?.username}`}
          />
        </SidebarSection>

        {/* <SidebarSection title='Organization'>
          <SidebarItem to='/cap-table' icon='lucide:pie-chart' label='Cap Table' isActive={false} />
          <SidebarItem
            to='/analytics'
            icon='lucide:bar-chart-2'
            label='Analytics'
            isActive={false}
          />
          <SidebarItem to='/perks' icon='lucide:gift' label='Perks' isActive={false} badge='3' />
          <SidebarItem to='/expenses' icon='lucide:file-text' label='Expenses' isActive={false} />
          <SidebarItem to='/settings' icon='lucide:settings' label='Settings' isActive={false} />
        </SidebarSection> */}

        {/*         <SidebarSection title='Your Teams'>
          <TeamItem code='HU' name='HeroUI' />
          <TeamItem code='TV' name='Tailwind Variants' />
          <TeamItem code='HP' name='HeroUI Pro' />
        </SidebarSection> */}
      </div>

      <div className='mt-auto'>
        <SidebarThemeSwitcher />
        <UserProfile />
      </div>
    </div>
  );
}
