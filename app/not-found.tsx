import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col p-4 lg:p-6">
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Where is nothing here
          </h3>
          <p className="text-muted-foreground text-sm">
            You must have got here by accident.
          </p>

          <Link href="/">
            <Button className="mt-4">To the Main page</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
