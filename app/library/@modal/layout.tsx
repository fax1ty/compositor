import { Placeholder } from "./placeholder";
import { Sheet } from "./sheet";

interface Props {
  children: React.ReactNode;
}

export default function SheetLayout({ children }: Props) {
  return (
    <>
      <Placeholder />
      <Sheet>{children}</Sheet>
    </>
  );
}
