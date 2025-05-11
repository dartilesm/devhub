interface PostThreadProps {
  children: React.ReactNode;
}

export function PostThread({ children }: PostThreadProps) {
  return (
    <div className='relative bg-content1 border-content1-foreground rounded-large overflow-hidden'>
      {children}
    </div>
  );
}
