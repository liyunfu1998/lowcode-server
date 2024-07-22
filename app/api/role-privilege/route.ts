import { apiHandler, transformInterceptor } from '@/helpers';
import rolePrivilegeRoleRepo from '@/helpers/dbRepo/role-privilege';
import type { NextRequest } from 'next/server';

const createRolePrivilege = apiHandler(async (req: NextRequest) => {
  const { roleId, privilegeId } = await req.json();
  const result = await rolePrivilegeRoleRepo.create(roleId, privilegeId);
  return transformInterceptor({
    data: result,
  });
});

const removeRolePrivilege = apiHandler(async (req: NextRequest) => {
  const { roleId, privilegeId } = await req.json();
  const result = await rolePrivilegeRoleRepo.remove(roleId, privilegeId);
  return transformInterceptor({
    data: result,
  });
});

export const POST = createRolePrivilege;
export const DELETE = removeRolePrivilege;
