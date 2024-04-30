import { Node } from "@tiptap/core";
import {
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const VariablehWrapper = ({
  node,
  editor,
  updateAttributes,
}: NodeViewProps) => {
  return (
    <NodeViewWrapper className="inline-flex">
      <Popover>
        <PopoverTrigger>
          <span className="rounded-md bg-violet-500 p-1 text-xs text-white">
            {node.attrs.label}
          </span>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem
                  onSelect={() => {
                    updateAttributes({ label: "test" });
                    editor.view.focus();
                  }}
                >
                  Rename variable
                </CommandItem>
                <CommandItem disabled>Add option</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </NodeViewWrapper>
  );
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    variable: {
      /**
       * Toggle a variable
       */
      setVariable: () => ReturnType;
    };
  }
}

export const Variable = Node.create({
  name: "variable",
  group: "inline",
  inline: true,
  atom: true,
  selectable: false,

  addAttributes() {
    return { label: "" };
  },

  parseHTML() {
    return [{ tag: "button" }];
  },

  addNodeView() {
    return ReactNodeViewRenderer(VariablehWrapper);
  },

  addCommands() {
    return {
      setVariable:
        () =>
        ({ commands }) => {
          return commands.setNode(this.name);
        },
    };
  },
});
