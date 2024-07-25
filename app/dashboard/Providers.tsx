'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import React from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
