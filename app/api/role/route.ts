import { apiHandler, transformInterceptor } from '@/helpers';
import roleRepo from '@/helpers/dbRepo/role';
import type { NextRequest } from 'next/server';

const create = apiHandler(async (req: NextRequest) => {
  const { systemId, ...args } = await req.json();
  const userId = await req.headers.get('userId');

  if (userId) {
    const result = await roleRepo.create({
      ...args,
      creator: {
        connect: {
          id: userId,
        },
      },
      updator: {
        connect: {
          id: userId,
        },
      },
      system: {
        connect: {
          id: systemId,
        },
      },
    });
    return transformInterceptor({
      data: result,
    });
  } else {
    throw new Error('请先登录');
  }
});

export const POST = create;
