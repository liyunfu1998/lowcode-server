import { NextResponse } from 'next/server';
import { transformInterceptor } from './transformInterceptor';

export function errorHandler(err: any) {
  if (typeof err === 'string') {
    const is404 = err.toLowerCase().endsWith('not found');
    const status = is404 ? 404 : 400;
    return NextResponse.json(
      transformInterceptor({
        message: err,
        code: status,
      }),
      { status },
    );
  }

  if (err.name === 'JsonWebTokenError') {
    return NextResponse.json(
      transformInterceptor({
        message: 'Unauthorized',
        code: 401,
      }),
      { status: 401 },
    );
  }

  if (err.name === 'UserExistsError') {
    return NextResponse.json(
      transformInterceptor({
        message: err.message,
        code: 422,
      }),
      { status: 422 },
    );
  }

  return NextResponse.json(
    transformInterceptor({
      message: err.message,
      code: 500,
    }),
    { status: 500 },
  );
}
