import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { errorHandler } from './errorHandler';
import validateMiddleware from './validate-middleware';
import jwtMiddleware from './jwt-middleware';

export function apiHandler(
  handler: (req: NextRequest, ...args: any[]) => any,
  { isJwt, schema }: { isJwt?: boolean; schema?: any } = {},
) {
  return async (req: NextRequest, ...args: any[]) => {
    try {
      await jwtMiddleware(req, isJwt);
      await validateMiddleware(req, schema);
      const responseBody = await handler(req, ...args);
      return NextResponse.json(responseBody || {});
    } catch (err: any) {
      return errorHandler(err);
    }
  };
}
