"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Users, Upload, UsersRound } from "lucide-react";

const navigationItems = [
  {
    name: "Attendees",
    href: "/admin",
    icon: Users,
  },
  {
    name: "Upload",
    href: "/admin/upload",
    icon: Upload,
  },
  {
    name: "Groups",
    href: "/admin/groups",
    icon: UsersRound,
  },
];

export default function AdminNavigation() {
  const pathname = usePathname();

  return (
    <nav className='border-b bg-background'>
      <div className='container mx-auto px-4'>
        <div className='flex space-x-1 overflow-x-auto'>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Button
                key={item.href}
                asChild
                variant={isActive ? "default" : "ghost"}
                size='sm'
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap",
                  isActive && "bg-primary text-primary-foreground"
                )}
              >
                <Link href={item.href}>
                  <Icon className='h-4 w-4' />
                  {item.name}
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
