import prisma from '@/helpers/prisma';

const selectField = {
  email: true,
  name: true,
  userRoles: true,
};
async function create(user: any) {
  return await prisma.user.create({
    data: user,
    select: selectField,
  });
}

async function update(id: string, user: any) {
  return await prisma.user.update({
    where: { id },
    data: user,
    select: selectField,
  });
}

async function remove(id: string) {
  return await prisma.user.delete({
    where: { id },
  });
}

async function findById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    select: selectField,
  });
}

async function paginate({ page, pageSize, ...params }: { page: number; pageSize: number }) {
  const skip = (page - 1) * pageSize;
  const take = pageSize;
  return await prisma.user.findMany({
    skip,
    take,
    where: {
      ...params,
    },
    select: selectField,
  });
}

const userRepo = {
  create,
  update,
  remove,
  findById,
  paginate,
};

export default userRepo;
