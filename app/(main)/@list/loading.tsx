import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="h-10" />

      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2.5">
          {new Array(5).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-6" />
          ))}
        </div>
      </ScrollArea>
    </>
  );
}
