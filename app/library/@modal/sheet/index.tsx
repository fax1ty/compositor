"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Sheet as SheetBase, SheetContent } from "@/components/ui/sheet";

import SheetContext from "./context";

interface Props {
  children: React.ReactNode;
}

export function Sheet({ children }: Props) {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const close = () => {
    setOpen(false);
    setTimeout(() => router.back(), 300);
  };

  return (
    <SheetBase
      open={open}
      modal={false}
      onOpenChange={(v) => {
        if (!v) close();
      }}
    >
      <SheetContext.Provider value={{ close }}>
        <SheetContent className="flex flex-col">{children}</SheetContent>
      </SheetContext.Provider>
    </SheetBase>
  );
}
