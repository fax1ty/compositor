"use client";

import { ListFilter } from "lucide-react";
import { parseAsStringLiteral, useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Controls() {
  const [feed, setFeed] = useQueryState(
    "feed",
    parseAsStringLiteral(["tranding", "new"]).withDefault("tranding")
  );

  return (
    <div className="flex items-center">
      <Tabs value={feed}>
        <TabsList>
          <TabsTrigger
            value="tranding"
            onClick={async () => await setFeed("tranding")}
          >
            Tranding
          </TabsTrigger>
          <TabsTrigger value="new" onClick={async () => await setFeed("new")}>
            New
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>
              Fulfilled
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
