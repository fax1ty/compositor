import { createContext, use } from "react";

interface SheetContext {
  close: () => void;
}

const SheetContext = createContext<SheetContext>(null!);

export const useSheetContext = () => use(SheetContext);

export default SheetContext;
