interface Props {
  children: React.ReactNode;
  list: React.ReactNode;
  modal: React.ReactNode;
}

export default function LibraryLayout({ children, list, modal }: Props) {
  return (
    <>
      <header className="flex h-14 flex-shrink-0 items-center gap-1 border-b px-4">
        <h1 className="text-xl font-semibold">Library</h1>
      </header>

      <main className="flex flex-1 gap-5 p-4 ">
        <div className="flex flex-1 flex-col gap-4 md:gap-8 ">
          {children}

          {list}
        </div>

        {modal}
      </main>
    </>
  );
}
