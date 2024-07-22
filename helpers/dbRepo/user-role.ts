import prisma from '@/helpers/prisma';

const selectField = {
  user: {
    select: {
      email: true,
      name: true,
    },
  },
  role: true,
};
async function create(userId: string, roleId: string) {
  return await prisma.userRole.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      role: {
        connect: {
          id: roleId,
        },
      },
    },
    select: selectField,
  });
}

async function remove(userId: string, roleId: string) {
  return await prisma.userRole.delete({
    where: {
      userId_roleId: {
        userId,
        roleId,
      },
    },
  });
}

async function findByUserId(userId: string) {
  return await prisma.userRole.findMany({
    where: {
      userId,
    },
    select: selectField,
  });
}

async function findByRoleId(roleId: string) {
  return await prisma.userRole.findMany({
    where: {
      roleId,
    },
    select: selectField,
  });
}

async function paginate({ page, pageSize, ...params }: { page: number; pageSize: number }) {
  const skip = (page - 1) * pageSize;
  const take = pageSize;
  return await prisma.userRole.findMany({
    skip,
    take,
    where: {
      ...params,
    },
    select: selectField,
  });
}

const userRoleRepo = {
  create,
  remove,
  findByUserId,
  findByRoleId,
  paginate,
};

export default userRoleRepo;
