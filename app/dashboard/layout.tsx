'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';
import { tokenStorage } from '@/helpers/storage';
import SkeletonComponent from '@/components/SkeletonComponent';

import User from './User';
import Providers from './Providers';
import Link from 'next/link';
import NavItem from './NavItem';
import {
  Home,
  Settings,
  User as UserIcon,
  MonitorCog,
  Boxes,
  ShieldAlert,
  Contact,
  PanelLeft,
  Package2,
  Smile,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    const token = tokenStorage.get();
    if (!token) {
      router.replace(`/?redirect=${pathname}`);
    } else {
      setIsMounted(true);
    }
  }, [router, pathname]);

  if (!isMounted) {
    return <SkeletonComponent />;
  }
  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">
        <DesktopNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileNav />
            <DashboardBreadcrumb pathName={pathname} />
            <User />
          </header>
          <main className="grid flex-1 items-start gap-2 bg-muted/40 p-4 sm:px-6 sm:py-0 md:gap-4">
            {children}
          </main>
        </div>
      </main>
    </Providers>
  );
}

function DesktopNav() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/dashboard"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Smile className="h-5 w-5 transition-all group-hover:scale-110" />
          <span className="sr-only">11</span>
        </Link>
        <NavItem href="/dashboard" label="Dashboard">
          <Home className="h-5 w-5" />
        </NavItem>
        <NavItem href="/dashboard/user" label="User">
          <UserIcon className="h-5 w-5" />
        </NavItem>
        <NavItem href="/dashboard/system" label="System">
          <MonitorCog className="h-5 w-5" />
        </NavItem>
        <NavItem href="/dashboard/source" label="Source">
          <Boxes className="h-5 w-5" />
        </NavItem>
        <NavItem href="/dashboard/privilege" label="Privilege">
          <ShieldAlert className="h-5 w-5" />
        </NavItem>
        <NavItem href="/dashboard/role" label="Role">
          <Contact className="h-5 w-5" />
        </NavItem>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}

function DashboardBreadcrumb({ pathName }: { pathName: string }) {
  const parts = pathName?.split('/')?.filter(Boolean);
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {parts?.map((item: any, index: number) => (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={'/' + parts.slice(0, index + 1)?.join('/')}>{item}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < parts.length - 1 && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/dashboard"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">low-code</span>
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            Home
          </Link>
          <Link
            href="/dashboard/user"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <UserIcon className="h-5 w-5" />
            User
          </Link>
          <Link
            href="/dashboard/system"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <MonitorCog className="h-5 w-5" />
            System
          </Link>
          <Link
            href="/dashboard/source"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Boxes className="h-5 w-5" />
            Source
          </Link>
          <Link
            href="/dashboard/privilege"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <ShieldAlert className="h-5 w-5" />
            Privilege
          </Link>
          <Link
            href="/dashboard/role"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Contact className="h-5 w-5" />
            Role
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
