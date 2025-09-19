import Header from "@/app/(root)/(client)/_components/header/header";
import { DistrictRequests } from "@/utils/request/district.request";
import { District } from "@prisma/client";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const districts: {
    success: boolean;
    result: { districts: District[] };
    message: string;
  } = await DistrictRequests.GETs();

  return (
    <main suppressHydrationWarning>
      <Header districts={districts.result.districts} />
      {children}
    </main>
  );
}
