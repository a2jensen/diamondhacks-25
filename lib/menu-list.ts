import Note from "@/app/notes/[noteID]/page";
import {
  Workflow,
  NotebookText,
  Brain,
  LucideIcon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/app/notes",
          label: "Notes",
          icon: NotebookText,
          submenus: []
        },
        {
          href: "/app/learning",
          label: "Learn",
          icon: Brain,
          submenus: []
        },
        {
          href: "/app/node-view",
          label: "Node Diagrams",
          icon: Workflow
        }
      ]
    }
  ];
}

