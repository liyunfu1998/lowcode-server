import { apiHandler, transformInterceptor } from '@/helpers';
import systemRepo from '@/helpers/dbRepo/system';
import prisma from '@/helpers/prisma';
import type { NextRequest } from 'next/server';

const create = apiHandler(async (req: NextRequest) => {
  const body = await req.json();
  const userId = await req.headers.get('userId');

  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const result = await systemRepo.create({
      ...body,
      creator: {
        connectOrCreate: {
          where: {
            id: userId,
          },
          create: {
            id: userId,
            name: user?.name,
            email: user?.email,
            password: user?.password,
          },
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

const list = apiHandler(async (req: NextRequest) => {
  const result = await systemRepo.list();
  return transformInterceptor({
    data: result,
  });
});

export const POST = create;
export const GET = list;
