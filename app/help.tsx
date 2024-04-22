"use client";

import { LifeBuoy } from "lucide-react";
import { forwardRef } from "react";

import { Button } from "@/components/ui/button";

export const HelpButton = forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  return (
    <Button
      {...props}
      ref={ref}
      variant="ghost"
      size="icon"
      className="mt-auto rounded-lg"
      aria-label="Help"
      onClick={() => window.$chatwoot.toggle("open")}
    >
      <LifeBuoy className="size-5" />
    </Button>
  );
});

HelpButton.displayName = "HelpButton";
