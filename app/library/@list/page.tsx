import Link from "next/link";

import { getServices } from "@/_api/services";
import { ServiceCardPreview } from "@/components/service-card/preview";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Controls } from "./controls";

export default async function List() {
  const services = await getServices();

  return (
    <div defaultValue="week" className="flex flex-1 flex-col gap-4">
      <Controls />

      <div className="flex flex-1 flex-col justify-start overflow-auto">
        <Card className="flex flex-1 flex-col p-4">
          <ScrollArea className="flex-1 basis-0">
            <div className="flex flex-col gap-4">
              {services.map((service) => (
                <Link key={service.id} href={`/library/${service.id}`}>
                  <ServiceCardPreview
                    service={service}
                    className="cursor-pointer"
                  />
                </Link>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
}
