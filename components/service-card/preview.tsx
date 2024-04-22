"use client";

import { useDndMonitor, useDraggable } from "@dnd-kit/core";
import { nanoid } from "nanoid";
import Image from "next/image";
import { forwardRef, useId } from "react";

import { Service } from "@/_api/service.types";
import { cn } from "@/lib/utils";
import { useCardsStore } from "@/stores/cards";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  service: Service;
}

export const DraggableServiceCardPreview = ({ service, ...props }: Props) => {
  const id = useId();

  const addCard = useCardsStore((state) => state.addCard);

  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: service,
  });
  useDndMonitor({
    onDragEnd: ({ active, over }) => {
      if (active.id !== id || !over) return;
      addCard(nanoid(), service);
    },
  });

  return (
    <ServiceCardPreview
      {...props}
      {...listeners}
      {...attributes}
      suppressHydrationWarning
      ref={setNodeRef}
      service={service}
    />
  );
};

export const ServiceCardPreview = forwardRef<HTMLDivElement, Props>(
  ({ className, service, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn(
          "flex cursor-grab select-none items-center gap-2 rounded-md border border-slate-200 bg-white p-2",
          className
        )}
      >
        <Image
          alt={service.name}
          width={16}
          height={16}
          src={service.image}
          className="size-4"
        />
        <p>{service.name}</p>
      </div>
    );
  }
);

ServiceCardPreview.displayName = "ServiceCardPreview";
