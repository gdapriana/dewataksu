"use client";
import AuthArea from "@/app/(root)/(client)/_components/header/auth";
import { Navigation } from "@/app/(root)/(client)/_components/header/naviagation";
import { Button } from "@/components/ui/button";
import { District } from "@prisma/client";
import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Header({ districts }: { districts: District[] }) {
  const { setTheme, theme } = useTheme();
  return (
    <header className="w-full z-[99999] flex justify-center items-center">
      <div className="max-w-7xl py-4 w-full relative px-4">
        <div className="absolute flex px-4 h-full justify-center items-center z-10 left-0 top-[50%] bottom-[50%] translate-y-[-50%]">
          <Link href="/">brand</Link>
        </div>
        <div className="z-0 h-[50px] md:h-auto w-full flex justify-center items-center">
          <Navigation districts={districts} />
        </div>
        <div className="absolute h-full px-4 gap-2 flex justify-center items-center z-10 right-0 top-[50%] bottom-[50%] translate-y-[-50%]">
          <AuthArea />
          {theme === "light" ? (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme("dark")}
            >
              <SunMoon />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme("light")}
            >
              <SunMoon />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
