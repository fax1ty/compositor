"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col p-4 lg:p-6">
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            An unexpected error has occurred
          </h3>
          <p className="text-muted-foreground text-sm">
            {`- You've been blessed with unexpected error. - What kind of error? - Unexpected. It's une... not expected.`}
          </p>

          <Link href="/">
            <Button className="mt-4" onClick={reset}>
              Reload
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
