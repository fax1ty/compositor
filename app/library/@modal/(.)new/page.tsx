"use client";

import { JSONContent } from "@tiptap/react";
import { Construction } from "lucide-react";
import { useState } from "react";

import { Editor } from "@/components/editor";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAsyncOperation } from "@/hooks/use-async-operation";
import { cn } from "@/lib/utils";

import { useSheetContext } from "../sheet/context";
import actionFn from "./action";

export default function NewDefinition() {
  const [content, setContent] = useState<JSONContent>([]);
  const [submitted, setSubmitted] = useState(false);

  const [action, progress] = useAsyncOperation(actionFn);

  const { close } = useSheetContext();

  return (
    <>
      <SheetHeader>
        <SheetTitle>
          {!submitted ? "Create New Definition" : "Success!"}
        </SheetTitle>
        <SheetDescription>???</SheetDescription>
      </SheetHeader>

      {!submitted && (
        <Alert>
          <Construction className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            This feature is in the early stages of development and may not work
            properly.
          </AlertDescription>
        </Alert>
      )}

      <div className={cn("flex flex-1 flex-col", submitted && "hidden")}>
        <Editor
          className="flex-1"
          content={content}
          onUpdate={({ editor }) => setContent(editor.getJSON())}
        />

        <div className="flex flex-col gap-2">
          <Button
            disabled={progress}
            onClick={async () => {
              await action(JSON.stringify(content));
              setSubmitted(true);
            }}
          >
            Submit
          </Button>
          {process.env.NEXT_PUBLIC_ENV === "local" && (
            <Button
              variant="ghost"
              onClick={() => {
                console.log(content);
              }}
            >
              Log to console
            </Button>
          )}
        </div>
      </div>

      {submitted && <Button onClick={close}>Ok</Button>}
    </>
  );
}
