import { apiHandler, transformInterceptor } from '@/helpers';
import privilegeRepo from '@/helpers/dbRepo/privilege';
import type { NextRequest } from 'next/server';

const create = apiHandler(async (req: NextRequest) => {
  const body = await req.json();

  const result = await privilegeRepo.create(body);

  return transformInterceptor({
    data: result,
  });
});

export const POST = create;
