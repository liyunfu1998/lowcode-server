import { apiHandler, transformInterceptor } from '@/helpers';
import userRepo from '@/helpers/dbRepo/user';
import type { NextRequest } from 'next/server';

const paginate = apiHandler(async (req: NextRequest) => {
  const { page, pageSize, ...params } = await req.json();
  const result = await userRepo.paginate({ page, pageSize, ...params });
  return transformInterceptor({
    data: result,
  });
});

export const POST = paginate;
