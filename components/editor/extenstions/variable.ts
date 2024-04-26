import { Node } from "@tiptap/core";
import { mergeAttributes } from "@tiptap/react";

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

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [{ tag: "button" }];
  },

  renderHTML({ HTMLAttributes, node }) {
    return [
      "button",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      `{${node.attrs.label || "unnamed_variable"}}`,
    ];
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
