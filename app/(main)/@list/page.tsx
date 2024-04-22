"use client";

import { DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useMemo, useState } from "react";

import { Service } from "@/_api/service.types";
import {
  DraggableServiceCardPreview,
  ServiceCardPreview,
} from "@/components/service-card/preview";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function List() {
  const [activeCardService, setActiveCardService] = useState<Service | null>(
    null
  );

  const services = useMemo<Service[]>(
    () => [
      {
        id: "nodejs",
        name: "Node.js",
        description:
          "Node.js is a JavaScript-based platform for server-side and networking applications.",
        image:
          "https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png",
      },
      {
        id: "postgres",
        name: "Postgres",
        description:
          "The PostgreSQL object-relational database system provides reliability and data integrity.",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/993px-Postgresql_elephant.svg.png",
      },
    ],
    []
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
      <div className="flex w-[200px] flex-col gap-4">
        <Input placeholder="Search..." />
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-2.5">
            {services.map((service, i) => (
              <DraggableServiceCardPreview key={i} service={service} />
            ))}
          </div>
        </ScrollArea>

        <DragOverlay>
          {activeCardService ? (
            <ServiceCardPreview service={activeCardService} />
          ) : null}
        </DragOverlay>
      </div>
    </>
  );
}
