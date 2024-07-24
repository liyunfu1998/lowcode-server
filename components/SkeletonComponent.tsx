import { Skeleton } from './ui/skeleton';
export default function SkeletonComponent() {
  return (
    <div className="mt-10 flex flex-col items-center">
      <Skeleton className="h-[125px] w-full rounded-xl" style={{ width: 'calc(100% - 30px)' }} />

      <div className="my-4 w-full shrink-0 space-y-2" style={{ width: 'calc(100% - 30px)' }}>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
