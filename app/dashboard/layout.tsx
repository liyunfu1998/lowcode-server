'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';
import { tokenStorage } from '@/helpers/storage';
import SkeletonComponent from '@/components/SkeletonComponent';

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
    <div>
      header
      {children}
    </div>
  );
}
