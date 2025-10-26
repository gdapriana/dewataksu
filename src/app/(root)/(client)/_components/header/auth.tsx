"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/utils/auth-client";
import { LogIn, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthArea() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const onSignOut = async () => {
    await authClient.signOut();
    router.replace("/");
  };

  // @ts-ignore
  if (session?.user?.role === "ADMIN" && !isPending) {
    return (
      <div className="lg:flex hidden justify-center items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={"/admin"}>
            <Settings />
            Admin
          </Link>
        </Button>
        <Button variant="outline" size="sm" onClick={onSignOut}>
          <LogOut />
          Logout
        </Button>
      </div>
    );
  }

  if (session && !isPending) {
    return (
      <Button variant="outline" size="sm" onClick={onSignOut}>
        Logout
      </Button>
    );
  }

  return (
    <Button size="sm" asChild>
      <Link href="/login">
        <LogIn />
        Login
      </Link>
    </Button>
  );
}
