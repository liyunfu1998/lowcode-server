import { apiHandler, transformInterceptor } from '@/helpers';
import systemRepo from '@/helpers/dbRepo/system';
import type { NextRequest } from 'next/server';
import prisma from '@/helpers/prisma';

const getSystem = apiHandler(async (req: NextRequest, { params }: { params: any }) => {
  const { id } = params;
  const result = await systemRepo.findById(id);
  return transformInterceptor({
    data: result,
  });
});

const updateSystem = apiHandler(async (req: NextRequest, { params }: { params: any }) => {
  const { id } = params;
  const userId = await req.headers.get('userId');
  const body = await req.json();
  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const result = await systemRepo.update(id, {
      ...body,
      updator: {
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

const removeSystem = apiHandler(async (req: NextRequest, { params }: { params: any }) => {
  const { id } = params;
  const result = await systemRepo.remove(id);
  return transformInterceptor({
    data: result,
  });
});

export const GET = getSystem;
export const PATCH = updateSystem;
export const DELETE = removeSystem;
