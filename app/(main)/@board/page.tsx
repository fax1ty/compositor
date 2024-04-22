"use client";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useDndMonitor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Download } from "lucide-react";
import { useState } from "react";

import { ServiceCard } from "@/components/service-card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useCardsStore } from "@/stores/cards";

export default function Board() {
  const [isDragging, setDragging] = useState(false);

  const cards = useCardsStore((state) => state.cards);
  const sortCard = useCardsStore((state) => state.sortCard);

  const { setNodeRef } = useDroppable({ id: "board" });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  useDndMonitor({
    onDragStart: () => setDragging(true),
    onDragEnd: () => setDragging(false),
  });

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis]}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (!over || active.id === over.id) return;

        const oldIndex = cards.findIndex((card) => card.id === active.id);
        const newIndex = cards.findIndex((card) => card.id === over.id);
        sortCard(oldIndex, newIndex);
      }}
    >
      <SortableContext items={cards} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="flex flex-1 flex-col gap-6">
          {!!cards.length && (
            <>
              <ScrollArea className="scroll-reveal flex-1">
                <div className="flex flex-col gap-4">
                  {cards.map(({ id, service }) => (
                    <ServiceCard key={id} id={id} service={service} />
                  ))}
                </div>
              </ScrollArea>

              <div className="flex justify-end gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-muted rounded-lg"
                  aria-label="Download YML"
                >
                  <Download className="size-5" />
                </Button>
              </div>
            </>
          )}

          {!cards.length && (
            <div
              className={cn(
                "flex flex-1 items-center justify-center rounded-lg border border-slate-200 p-4 duration-300",
                isDragging && "border-slate-600"
              )}
            >
              <p>Drop it here</p>
            </div>
          )}
        </div>
      </SortableContext>
    </DndContext>
  );
}
