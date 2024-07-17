import type { NextRequest } from 'next/server';
import { verifyToken } from './auth';

export default async function jwtMiddleware(req: NextRequest, isJwt: boolean = false) {
  const id: string = (await verifyToken(req, isJwt)) as string;
  req.headers.set('userId', id);
}
