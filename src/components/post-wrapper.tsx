interface PostWrapperProps {
  children: React.ReactNode;
}

export function PostWrapper({ children }: PostWrapperProps) {
  return (
    <div className='relative dark:bg-content1 dark:border-content2 bg-default-200/20 border border-content3 rounded-large overflow-hidden'>
      {children}
    </div>
  );
}
