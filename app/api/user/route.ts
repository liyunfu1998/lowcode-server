import { apiHandler, transformInterceptor } from '@/helpers';
import userRepo from '@/helpers/dbRepo/user';
import type { NextRequest } from 'next/server';

const create = apiHandler(async (req: NextRequest) => {
  const body = await req.json();
  const result = await userRepo.create(body);
  return transformInterceptor({
    data: result,
  });
});

export const POST = create;
