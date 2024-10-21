import React from 'react';

export const FullPageLoading = () => {
  return (
    <div className="flex min-h-[calc(100dvh-10.2rem)] flex-col items-center justify-center px-4">
      <div className="h-12 w-12 animate-spin rounded-full border-b-4 border-t-4 border-primary"></div>
    </div>
  );
};
