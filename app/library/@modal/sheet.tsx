"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Sheet as SheetBase, SheetContent } from "@/components/ui/sheet";

interface Props {
  children: React.ReactNode;
}

export function Sheet({ children }: Props) {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  return (
    <SheetBase
      open={open}
      modal={false}
      onOpenChange={(v) => {
        if (!v) {
          setOpen(false);
          setTimeout(() => router.back(), 300);
        }
      }}
    >
      <SheetContent className="flex flex-col">{children}</SheetContent>
    </SheetBase>
  );
}
