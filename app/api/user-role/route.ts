import { apiHandler, transformInterceptor } from '@/helpers';
import userRoleRepo from '@/helpers/dbRepo/user-role';
import type { NextRequest } from 'next/server';

const createUserRole = apiHandler(async (req: NextRequest) => {
  const { roleId } = await req.json();
  const userId = await req.headers.get('userId');
  if (!userId) {
    throw new Error('请先登录');
  }
  const result = await userRoleRepo.create(userId, roleId);
  return transformInterceptor({
    data: result,
  });
});

const removeUserRole = apiHandler(async (req: NextRequest) => {
  const { roleId } = await req.json();
  const userId = await req.headers.get('userId');
  if (!userId) {
    throw new Error('请先登录');
  }
  const result = await userRoleRepo.remove(userId, roleId);
  return transformInterceptor({
    data: result,
  });
});

const findUserRole = apiHandler(async (req: NextRequest) => {
  const userId = await req.headers.get('userId');
  if (!userId) {
    throw new Error('请先登录');
  }
  const result = await userRoleRepo.findByUserId(userId);
  return transformInterceptor({
    data: result,
  });
});

export const POST = createUserRole;
export const DELETE = removeUserRole;
export const GET = findUserRole;
