import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="absolute left-0 top-0 w-full z-[99999] bg-background">
      {children}
    </div>
  );
}
