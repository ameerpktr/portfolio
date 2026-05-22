import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background p-6">
      <Skeleton className="h-[80vh] w-full rounded-[2rem]" />
    </div>
  );
}
