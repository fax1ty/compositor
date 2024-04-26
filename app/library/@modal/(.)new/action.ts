"use server";

import { auth } from "@/auth";
import { supabase } from "@/supabase";

export default async function action(behavior: string) {
  const session = await auth();

  if (!session || !session.user?.id) throw new Error("403");

  await supabase.from("services").insert({
    behavior,
    created_by: session.user.id,
    description: "idk",
    image: "",
    name: "test",
  });
}
