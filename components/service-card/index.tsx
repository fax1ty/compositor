"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash } from "lucide-react";

import { Service } from "@/api/service.types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCardsStore } from "@/stores/cards";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  service: Service;
}

export const ServiceCard = ({ id, service, ...props }: Props) => {
  const removeCard = useCardsStore((state) => state.removeCard);

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      {...props}
      {...attributes}
      ref={setNodeRef}
      style={style}
      className="flex cursor-default"
    >
      <div className="flex flex-1 flex-col">
        <CardHeader>
          <CardTitle>{service.name}</CardTitle>
          <CardDescription>{service.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <p>Card Content</p>
        </CardContent>

        <CardFooter>
          <Button
            variant="outline"
            size="icon"
            className="bg-muted rounded-lg"
            aria-label="Playground"
            onClick={() => removeCard(id)}
          >
            <Trash className="size-5" />
          </Button>
        </CardFooter>
      </div>
      <div
        {...listeners}
        ref={setActivatorNodeRef}
        className="flex cursor-grab items-center px-4"
      >
        <GripVertical className="size-4 text-slate-600" />
      </div>
    </Card>
  );
};
