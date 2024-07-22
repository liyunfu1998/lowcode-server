import { apiHandler, transformInterceptor } from '@/helpers';
import resourceRepo from '@/helpers/dbRepo/resource';
import type { NextRequest } from 'next/server';

const paginate = apiHandler(async (req: NextRequest) => {
  const body = await req.json();
  const result = await resourceRepo.paginate(body);
  return transformInterceptor({
    data: result,
  });
});

export const POST = paginate;
