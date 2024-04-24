import { SupabaseAdapter } from "@auth/supabase-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { signIn, signOut, auth, handlers } = NextAuth({
  providers: [GitHub],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  debug: true,
});
