import { cn } from "@/lib/utils";

interface PostThreadLineProps {
  isFirstInThread: boolean;
  isLastInThread: boolean;
}

export function PostThreadLine({ isFirstInThread, isLastInThread }: PostThreadLineProps) {
  return (
    <div
      className={cn("absolute w-18 h-full top-0 flex items-center justify-center", {
        "top-8": isFirstInThread,
        "h-1/2": isLastInThread,
      })}
    >
      <div className='relative w-[2px] z-10 h-full'>
        <div className='absolute left-0 top-0 bottom-0 w-full bg-border/60 border border-content3' />
      </div>
    </div>
  );
}
