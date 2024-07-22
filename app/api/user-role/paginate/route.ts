import { apiHandler, transformInterceptor } from '@/helpers';
import userRoleRepo from '@/helpers/dbRepo/user-role';
import type { NextRequest } from 'next/server';

const paginate = apiHandler(async (req: NextRequest) => {
  const { page, pageSize, ...params } = await req.json();
  const result = await userRoleRepo.paginate({ page, pageSize, ...params });
  return transformInterceptor({
    data: result,
  });
});

export const POST = paginate;
