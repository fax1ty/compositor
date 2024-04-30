"use client";

import Document from "@tiptap/extension-document";
import History from "@tiptap/extension-history";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import {
  BubbleMenu,
  Content,
  EditorContent,
  EditorContentProps,
  EditorOptions,
  useEditor,
} from "@tiptap/react";

import { cn } from "@/lib/utils";

import { Variable } from "./extenstions/variable";
import { Menu } from "./menu";
import { placeholder } from "./placeholder";

interface Props extends Omit<EditorContentProps, "editor" | "ref" | "content"> {
  onUpdate?: EditorOptions["onUpdate"];
  content?: Content;
}

export function Editor({ className, onUpdate, content, ...props }: Props) {
  const editor = useEditor({
    content,
    extensions: [
      Document,
      History,
      Text,
      Paragraph,
      Variable,
      Placeholder.configure({
        placeholder,
      }),
    ],
    onUpdate,
  });

  return (
    <>
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100, placement: "bottom" }}
        >
          <Menu
            onVariableCreate={(label, clearInput) => {
              if (!editor) return;

              editor
                .chain()
                .focus()
                .insertContent({
                  type: "variable",
                  attrs: { label },
                })
                .run();
              clearInput();
            }}
          />
        </BubbleMenu>
      )}
      <EditorContent
        {...props}
        editor={editor}
        className={cn(
          "flex flex-col selection:bg-violet-500 selection:text-white [&>:first-child]:flex-1 [&>:first-child]:outline-none",
          className
        )}
      />
    </>
  );
}
