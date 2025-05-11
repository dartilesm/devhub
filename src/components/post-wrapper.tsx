interface PostWrapperProps {
  children: React.ReactNode;
}

export function PostWrapper({ children }: PostWrapperProps) {
  return (
    <div className='relative bg-content1 border-content1-foreground rounded-large overflow-hidden'>
      {children}
    </div>
  );
}
