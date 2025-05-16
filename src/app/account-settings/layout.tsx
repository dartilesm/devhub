import { Sidebar } from "@/components/sidebar/sidebar";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='grid grid-cols-[max-content_1fr] gap-4 px-4 mx-auto w-full max-w-7xl'>
      <div className='flex flex-col gap-4 sticky top-0 max-h-dvh'>
        <Sidebar />
      </div>
      <div className='flex flex-col gap-4 min-h-dvh p-4'>{children}</div>
    </main>
  );
}
