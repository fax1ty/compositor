"use client";

import { LifeBuoy } from "lucide-react";

import { Button } from "@/components/ui/button";

export const HelpButton = () => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="mt-auto rounded-lg"
      aria-label="Help"
      onClick={() => window.$chatwoot.toggle("open")}
    >
      <LifeBuoy className="size-5" />
    </Button>
  );
};
