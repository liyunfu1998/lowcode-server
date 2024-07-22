import { apiHandler, transformInterceptor } from '@/helpers';
import rolePrivilegeRoleRepo from '@/helpers/dbRepo/role-privilege';
import type { NextRequest } from 'next/server';

const findRolePrivilege = apiHandler(async (req: NextRequest, { params }: { params: any }) => {
  const result = await rolePrivilegeRoleRepo.findByRoleId(params.id);
  return transformInterceptor({
    data: result,
  });
});

export const GET = findRolePrivilege;
