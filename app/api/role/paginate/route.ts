import { apiHandler, transformInterceptor } from '@/helpers';
import roleRepo from '@/helpers/dbRepo/role';
import type { NextRequest } from 'next/server';

const paginate = apiHandler(async (req: NextRequest) => {
  const { page, pageSize, ...params } = await req.json();
  const result = await roleRepo.paginate({ page, pageSize, ...params });
  return transformInterceptor({
    data: result,
  });
});

export const POST = paginate;
