// import { Share } from "lucide-react";

// import { Button } from "@/components/ui/button";

interface Props {
  list: React.ReactNode;
  board: React.ReactNode;
}

export default function Home({ list, board }: Props) {
  return (
    <>
      <header className="flex h-14 flex-shrink-0 items-center gap-1 border-b px-4">
        <h1 className="text-xl font-semibold">Playground</h1>
        {/* <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
          <Share className="size-3.5" />
          Share
        </Button> */}
      </header>

      <main className="flex flex-1 gap-5 overflow-auto p-4">
        <div className="flex w-[200px] flex-col gap-4">{list}</div>
        {board}
      </main>
    </>
  );
}
