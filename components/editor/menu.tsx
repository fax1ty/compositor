import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  onVariableCreate?: (label: string, clearInput: () => void) => void;
}

export function Menu({ onVariableCreate }: Props) {
  const input = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState("");

  const { ref, inView } = useInView();

  useEffect(() => {
    input.current?.focus();
  }, [inView]);

  const onDone = () => {
    if (onVariableCreate) onVariableCreate(value, () => setValue(""));
  };

  return (
    <div
      ref={ref}
      className="flex flex-col gap-2 rounded-md bg-white p-2 shadow-lg"
    >
      <Input
        ref={input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Variable name"
        onKeyDown={({ key }) => {
          if (key === "Enter") onDone();
        }}
      />
      <Button variant="secondary" onClick={onDone}>
        Create variable
      </Button>
    </div>
  );
}
