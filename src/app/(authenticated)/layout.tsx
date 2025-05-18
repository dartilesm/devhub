import { Sidebar } from "@/components/sidebar/sidebar";
import { SuggestionsSection } from "@/components/suggestions/suggestions-section";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='grid grid-cols-1 md:grid-cols-[1fr_600px_1fr] gap-4 px-4 mx-auto w-full max-w-7xl'>
      <div className='flex-col gap-4 sticky top-0 max-h-dvh hidden md:flex'>
        <Sidebar />
      </div>
      <div className='flex flex-col min-h-dvh max-w-full'>{children}</div>
      <div className='flex-col gap-4 sticky top-4 h-fit hidden md:flex'>
        <SuggestionsSection />
      </div>
    </main>
  );
}
