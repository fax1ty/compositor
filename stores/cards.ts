import { arrayMove } from "@dnd-kit/sortable";
import { create } from "zustand";

import { Service } from "@/_api/service.types";

interface Card {
  id: string;
  service: Service;
}

interface CardsStore {
  cards: Card[];
  addCard: (id: Card["id"], service: Service) => void;
  removeCard: (id: Card["id"]) => void;
  sortCard: (from: number, to: number) => void;
}

export const useCardsStore = create<CardsStore>((set, get) => ({
  cards: [],
  addCard: (id, service) => {
    set({ cards: [...get().cards, { id, service }] });
  },
  removeCard: (id) => {
    set({ cards: get().cards.filter((service) => service.id !== id) });
  },
  sortCard: (from, to) => {
    set({ cards: arrayMove(get().cards, from, to) });
  },
}));
