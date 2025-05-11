import React from "react";

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

export function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className='py-2'>
      <h2 className='px-6 my-2 text-xs font-medium uppercase text-gray-500'>{title}</h2>
      <div className='space-y-1'>{children}</div>
    </div>
  );
}
