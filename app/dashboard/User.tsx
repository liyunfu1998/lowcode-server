'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { userStorage } from '@/helpers/storage';
import Image from 'next/image';
import Link from 'next/link';
export default function User() {
  const userInfo = JSON.parse(userStorage.get() || '{}');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
          <Image
            src={'/placeholder-user.jpg'}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{userInfo?.email}</DropdownMenuLabel>
        <DropdownMenuLabel>{userInfo?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userInfo?.email ? (
          <DropdownMenuItem>
            <Link href={'/'}>Sign Out</Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link href={'/'}>Sign In</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
