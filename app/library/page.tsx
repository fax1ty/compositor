import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Library - Compositor",
};

export default function Library() {
  return (
    <div className="flex">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Your Definitions</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            ???
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-4">
          <Link href="/library/new">
            <Button>Create New Definition</Button>
          </Link>
          <Link href="/library/manage">
            <Button variant="secondary">Manage</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
