import { cn } from '@utils';
import React from 'react';

export const SectionContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('mx-auto w-full px-4 md:px-20', className)}>
      {children}
    </div>
  );
};
