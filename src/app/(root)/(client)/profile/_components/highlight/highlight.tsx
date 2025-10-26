import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserRelation } from "@/utils/types";
import { Settings } from "lucide-react";
import Link from "next/link";

export default function Highlight({
  profile,
}: {
  profile?: UserRelation | undefined;
}) {
  return (
    <div className="w-full gap-4 justify-center py-12 items-center flex flex-col">
      <Avatar className="w-16 h-16">
        <AvatarImage src={profile?.profileImage?.url || profile?.image || ""} />
        <AvatarFallback className="text-xl uppercase">
          {profile?.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-start gap-1 items-center">
        <h1 className="font-bold text-lg md:text-xl">{profile?.name}</h1>
        <p className="text-sm text-muted-foreground">{profile?.email}</p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <Button asChild>
          <Link href="/profile/story">Add Story</Link>
        </Button>
        <Button variant="secondary">
          <Settings />
        </Button>
      </div>
    </div>
  );
}
