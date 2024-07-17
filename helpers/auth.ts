import jwt from 'jsonwebtoken';
import type { NextRequest } from 'next/server';

const TOKEN_SECRET = process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET || '';
export async function verifyToken(req: NextRequest, isJwt: boolean) {
  try {
    const token = req?.headers?.get('authorization');
    if (!token) {
      throw new Error('No token provided');
    }
    const decoded: any = jwt.verify(token, TOKEN_SECRET);
    const id = decoded?.id;
    return new Promise((resolve) => resolve(id));
  } catch (error) {
    if (isJwt) {
      throw error;
    }
  }
}

export async function createAccessToken(payload: any) {
  if (!payload) {
    throw new Error('No payload provided');
  }
  return jwt.sign(payload, TOKEN_SECRET, {
    expiresIn: '1d',
  });
}
