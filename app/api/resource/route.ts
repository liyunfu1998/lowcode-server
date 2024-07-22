import { apiHandler, transformInterceptor } from '@/helpers';
import resourceRepo from '@/helpers/dbRepo/resource';
import type { NextRequest } from 'next/server';

const create = apiHandler(async (req: NextRequest) => {
  const body = await req.json();

  const result = await resourceRepo.create(body);

  return transformInterceptor({
    data: result,
  });
});

export const POST = create;
