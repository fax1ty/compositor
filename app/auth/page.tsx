import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GitHubButton = () => {
  return (
    <form
      className="flex flex-col"
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: "/" });
      }}
    >
      <Button type="submit">Sign in with GitHub</Button>
    </form>
  );
};

export default function Auth() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Auth</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <GitHubButton />
        </CardContent>
      </Card>
    </div>
  );
}
