import { Skeleton } from '@ui';

export function CallInterfaceSkeleton() {
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      {/* Skeleton for the camera preview */}
      <Skeleton className="h-[300px] w-[500px] rounded-lg" />

      {/* Skeleton for the control buttons */}
      <div className="flex space-x-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>

      {/* Skeletons for the dropdown menus */}
      <div className="flex w-full max-w-xs flex-col space-y-2">
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-full rounded-md" />
      </div>

      {/* Skeleton for the 'Start a call' button */}
      <Skeleton className="h-12 w-[200px] rounded-lg" />
    </div>
  );
}
