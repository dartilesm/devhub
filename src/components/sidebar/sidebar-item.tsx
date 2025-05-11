import { Icon } from "@iconify/react";
import { Chip, cn } from "@heroui/react";
import Link from "next/link";

interface SidebarItemProps {
  to: string;
  icon: string;
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
        "flex items-center justify-between px-4 py-2 mx-2 my-1 rounded-full transition-colors group hover:bg-content1/80",
        {
          "bg-content2": isActive,
        }
      )}
    >
      <div className='flex items-center'>
        <Icon
          icon={icon}
          width={20}
          height={20}
          className={cn("mr-3 text-content2-foreground", {
            "text-content1-foreground": isActive,
          })}
        />
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
