import { apiHandler, transformInterceptor } from '@/helpers';
import userRepo from '@/helpers/dbRepo/user';
import type { NextRequest } from 'next/server';

const update = apiHandler(async (req: NextRequest) => {
  const body = await req.json();
  const userId = await req.headers.get('userId');
  if (!userId) {
    throw new Error('请先登录');
  }
  const result = await userRepo.update(userId, body);
  return transformInterceptor({
    data: result,
  });
});

const remove = apiHandler(async (req: NextRequest) => {
  const userId = await req.headers.get('userId');
  if (!userId) {
    throw new Error('请先登录');
  }

  const result = await userRepo.remove(userId);
  return transformInterceptor({
    data: result,
  });
});

const findById = apiHandler(async (req: NextRequest) => {
  const userId = await req.headers.get('userId');
  if (!userId) {
    throw new Error('请先登录');
  }
  const result = await userRepo.findById(userId);
  return transformInterceptor({
    data: result,
  });
});

export const PATCH = update;
export const DELETE = remove;
export const GET = findById;
