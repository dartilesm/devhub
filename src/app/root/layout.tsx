import { Sidebar } from "@/components/sidebar/sidebar";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='grid grid-cols-[min-content_600px_min-content] gap-4 px-4 mx-auto w-full max-w-7xl'>
      <div className='flex flex-col gap-4'>
        <Sidebar />
      </div>
      <div className='flex flex-col gap-4 min-h-dvh pt-4'>{children}</div>
      <div className='flex flex-col gap-4'>{/* Right sidebar */}</div>
    </main>
  );
}
