import prisma from '@/helpers/prisma';

async function create(roleId: string, privilegeId: string) {
  return await prisma.rolePrivilege.create({
    data: {
      role: {
        connect: {
          id: roleId,
        },
      },
      privilege: {
        connect: {
          id: privilegeId,
        },
      },
    },
  });
}

async function remove(roleId: string, privilegeId: string) {
  return await prisma.rolePrivilege.delete({
    where: {
      roleId_privilegeId: {
        roleId,
        privilegeId,
      },
    },
  });
}

async function findByRoleId(roleId: string) {
  return await prisma.rolePrivilege.findMany({
    where: {
      roleId,
    },
  });
}

const rolePrivilegeRepo = {
  create,
  remove,
  findByRoleId,
};

export default rolePrivilegeRepo;
