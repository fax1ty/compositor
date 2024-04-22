"use client";

import { DndContext } from "@dnd-kit/core";

interface Props {
  children: React.ReactNode;
}

export const DndProviderSSR = ({ children }: Props) => (
  <DndContext>{children}</DndContext>
);
