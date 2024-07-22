import { apiHandler, transformInterceptor } from '@/helpers';
import privilegeRepo from '@/helpers/dbRepo/privilege';
import type { NextRequest } from 'next/server';

const paginate = apiHandler(async (req: NextRequest) => {
  const body = await req.json();
  const result = await privilegeRepo.paginate(body);
  return transformInterceptor({
    data: result,
  });
});

export const POST = paginate;
