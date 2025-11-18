"use client";

import {
  AudioWaveform,
  BookA,
  Command,
  Frame,
  GalleryVerticalEnd,
  Layers3,
  Map,
  MapIcon,
  Palmtree,
  PieChart,
  Rainbow,
  Settings2,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { authClient } from "@/utils/auth-client";
import { email } from "zod";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Destinations",
      url: "#",
      icon: Palmtree,
      isActive: true,
      items: [
        {
          title: "New Destination",
          url: "/admin/destinations/create",
        },
        {
          title: "All Destinations",
          url: "/admin/destinations",
        },
      ],
    },
    {
      title: "Traditions",
      url: "#",
      icon: Rainbow,
      isActive: false,
      items: [
        {
          title: "New Tradition",
          url: "/admin/traditions/create",
        },
        {
          title: "All Traditions",
          url: "/admin/traditions",
        },
      ],
    },
    {
      title: "Stories",
      url: "#",
      icon: BookA,
      isActive: false,
      items: [
        {
          title: "New Story",
          url: "/admin/stories/create",
        },
        {
          title: "All Stories",
          url: "/admin/stories",
        },
      ],
    },
    {
      title: "District",
      url: "#",
      icon: MapIcon,
      isActive: false,
      items: [
        {
          title: "New District",
          url: "/admin/districts/create",
        },
        {
          title: "All Districts",
          url: "/admin/districts",
        },
      ],
    },
    {
      title: "Categories",
      url: "#",
      icon: Layers3,
      isActive: false,
      items: [
        {
          title: "New Category",
          url: "/admin/categories/create",
        },
        {
          title: "All Categories",
          url: "/admin/categories",
        },
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: Users,
      isActive: false,
      items: [
        {
          title: "All Users",
          url: "/admin/users",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();
  const userData = {
    name: session?.user.name,
    email: session?.user.email,
    avatar: session?.user.image,
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
