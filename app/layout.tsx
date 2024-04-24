import "./globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Library, SquareTerminal, SquareUser, Triangle } from "lucide-react";
import { Inter } from "next/font/google";
import Link from "next/link";
import Script from "next/script";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { DndProviderSSR } from "./dnd-provider";
import { HelpButton } from "./help";
import { HyperDX } from "./hyperdx";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <TooltipProvider>
          <div className="flex h-screen w-full">
            <aside className="flex flex-col border-r">
              <div className="flex h-14 items-center justify-center border-b p-2">
                <Triangle className="fill-foreground size-5" />
              </div>
              <nav className="flex flex-col gap-1 p-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-muted rounded-lg"
                        aria-label="Playground"
                      >
                        <SquareTerminal className="size-5" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={5}>
                    Playground
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/library">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-muted rounded-lg"
                        aria-label="Library"
                      >
                        <Library className="size-5" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={5}>
                    Library
                  </TooltipContent>
                </Tooltip>
              </nav>
              <nav className="mt-auto flex flex-col gap-1 p-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpButton />
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={5}>
                    Help
                  </TooltipContent>
                </Tooltip>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="bg-muted rounded-lg"
                            aria-label="Account"
                          >
                            <SquareUser className="size-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                          Account
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="right"
                    align="end"
                    sideOffset={16}
                    alignOffset={2}
                  >
                    <DropdownMenuLabel>
                      {session?.user?.name || "My account"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {!!session && (
                      <>
                        <Link href="/account">
                          <DropdownMenuItem>Settings</DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={async () => {
                            "use server";
                            await signOut();
                          }}
                        >
                          Log out
                        </DropdownMenuItem>
                      </>
                    )}
                    {!session && (
                      <Link href="/auth">
                        <DropdownMenuItem>Log in</DropdownMenuItem>
                      </Link>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
            </aside>
            <div className="flex flex-1 flex-col">
              <DndProviderSSR>{children}</DndProviderSSR>
            </div>
          </div>
        </TooltipProvider>

        <Script id="chatwoot" strategy="afterInteractive">
          {`
              window.chatwootSettings = {
                hideMessageBubble: true,
                position: 'left', // This can be left or right
                locale: 'en', // Language to be set
                type: 'standard', // [standard, expanded_bubble]
              };
          
              (function(d,t) {
                var BASE_URL="https://app.chatwoot.com";
                var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
                g.src=BASE_URL+"/packs/js/sdk.js";
                g.defer = true;
                g.async = true;
                s.parentNode.insertBefore(g,s);
                g.onload=function(){
                  window.chatwootSDK.run({
                    websiteToken: '${process.env.NEXT_PUBLIC_CHATWOOT_TOKEN}',
                    baseUrl: BASE_URL
                  })
                }
              })(document,"script");
          `}
        </Script>
        <HyperDX />
        <SpeedInsights />
      </body>
    </html>
  );
}
