import Header from "@/app/(root)/(client)/_components/header/header";
import { DistrictRequests } from "@/utils/request/district.request";
import { District } from "@prisma/client";
import { ReactNode } from "react";
import { DM_Sans } from "next/font/google";
const font = DM_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default async function Layout({ children }: { children: ReactNode }) {
  const districts: {
    success: boolean;
    result: { districts: District[] };
    message: string;
  } = await DistrictRequests.GETs();

  return (
    <main suppressHydrationWarning className={font.className}>
      <Header districts={districts.result.districts} />
      {children}
    </main>
  );
}
