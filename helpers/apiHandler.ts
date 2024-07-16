import { NextRequest, NextResponse } from 'next/server';
import { errorHandler } from './errorHandler';

export function apiHandler(
  handler: (req: typeof NextRequest, ...args: any[]) => any,
  { isJwt, isValidate }: { isJwt?: boolean; isValidate?: boolean } = {},
) {
  return async (req: typeof NextRequest, ...args: any[]) => {
    try {
      if (isValidate) {
        // jwt 验证
        // error示例
        throw new Error('jwt error');
      }
      const responseBody = await handler(req, ...args);
      return NextResponse.json(responseBody || {});
    } catch (err: any) {
      return errorHandler(err);
    }
  };
}
