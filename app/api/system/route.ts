import { apiHandler, transformInterceptor } from '@/helpers';
import systemRepo from '@/helpers/dbRepo/system';
import type { NextRequest } from 'next/server';

const create = apiHandler(async (req: NextRequest) => {
  const body = await req.json();
  const userId = await req.headers.get('userId');

  const result = await systemRepo.create({
    ...body,
    creator: {
      connect: {
        id: userId,
      },
    },
  });
  return transformInterceptor({
    data: result,
  });
});

const list = apiHandler(async (req: NextRequest) => {
  const result = await systemRepo.list();
  return transformInterceptor({
    data: result,
  });
});

export const POST = create;
export const GET = list;
