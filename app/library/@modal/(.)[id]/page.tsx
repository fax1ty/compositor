import { notFound } from "next/navigation";

import { getService } from "@/_api/services";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Props } from "./props";

export default async function Service({ params }: Props) {
  const service = await getService(parseInt(params.id));

  if (!service) return notFound();

  return (
    <>
      <SheetHeader>
        <SheetTitle>{service?.name}</SheetTitle>
        <SheetDescription>{service?.description}</SheetDescription>
      </SheetHeader>
    </>
  );
}
