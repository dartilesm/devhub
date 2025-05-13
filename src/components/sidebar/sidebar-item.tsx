import { Icon } from "@iconify/react";
import { Chip, cn } from "@heroui/react";
import Link from "next/link";
import { ReactNode } from "react";

interface SidebarItemProps {
  to: string;
  icon: ReactNode;
  label: string;
  isActive: boolean;
  hasAddButton?: boolean;
  badge?: string;
}

export function SidebarItem({
  to,
  icon,
  label,
  isActive,
  hasAddButton = false,
  badge,
}: SidebarItemProps) {
  return (
    <Link
      href={to}
      className={cn(
        "flex items-center justify-between px-4 py-2 mx-2 my-1 rounded-full transition-colors group hover:bg-content4/80 dark:hover:bg-content4/60",
        {
          "bg-content3 dark:bg-content3/50": isActive,
        }
      )}
    >
      <div className='flex items-center gap-3'>
        {icon}
        <span
          className={cn("text-content2-foreground", {
            "text-content1-foreground": isActive,
          })}
        >
          {label}
        </span>
      </div>

      {hasAddButton && (
        <button
          className='text-content2-foreground hover:text-content1-foreground transition-colors opacity-0 group-hover:opacity-100'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            // Handle add action
            console.log(`Add new ${label}`);
          }}
        >
          <Icon icon='lucide:plus' width={16} height={16} />
        </button>
      )}

      {badge && (
        <Chip color='primary' size='sm'>
          {badge}
        </Chip>
      )}
    </Link>
  );
}
