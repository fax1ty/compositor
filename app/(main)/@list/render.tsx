"use client";

import { DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { Service } from "@/_api/services.types";
import {
  DraggableServiceCardPreview,
  ServiceCardPreview,
} from "@/components/service-card/preview";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  services: Service[];
}

export default function Render({ services }: Props) {
  const [search, setSearch] = useQueryState("q", { shallow: false });
  const [input, setInput] = useState(search || "");
  const [activeCardService, setActiveCardService] = useState<Service | null>(
    null
  );

  const onSearch = useDebouncedCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) =>
      await setSearch(e.target.value || null),
    500
  );

  useDndMonitor({
    onDragStart: (event) => {
      setActiveCardService(event.active.data.current as Service);
    },
    onDragEnd: () => {
      setActiveCardService(null);
    },
  });

  return (
    <>
      <Input
        placeholder="Search..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          onSearch(e);
        }}
      />

      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2.5">
          {services.map((service, i) => (
            <DraggableServiceCardPreview key={i} service={service} />
          ))}

          {!services.length && (
            <p className="text-sm">So far, no one has added the service yet</p>
          )}
        </div>
      </ScrollArea>

      <DragOverlay>
        {activeCardService ? (
          <ServiceCardPreview service={activeCardService} />
        ) : null}
      </DragOverlay>
    </>
  );
}
