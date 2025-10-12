import { LucideIcon } from "lucide-react";

export default function SideHeader({
  text,
  Icon,
}: {
  text: string;
  Icon: LucideIcon;
}) {
  return (
    <header className="flex pb-4 justify-start items-center">
      <h2 className="font-bold text-lg flex gap-1 justify-start items-start">
        <Icon />
        {text}
      </h2>
    </header>
  );
}
