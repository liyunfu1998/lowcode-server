import prisma from '@/helpers/prisma';

async function create(role: any) {
  return await prisma.role.create({
    data: role,
  });
}

async function update(id: string, role: any) {
  return await prisma.role.update({
    where: { id },
    data: role,
  });
}

async function remove(id: string) {
  return await prisma.role.delete({
    where: { id },
  });
}

async function findById(id: string) {
  return await prisma.role.findUnique({
    where: { id },
  });
}

async function paginate({ page, pageSize, ...params }: { page: number; pageSize: number }) {
  const skip = (page - 1) * pageSize;
  const take = pageSize;
  return await prisma.role.findMany({
    skip,
    take,
    where: {
      ...params,
    },
  });
}

const roleRepo = {
  create,
  update,
  remove,
  findById,
  paginate,
};

export default roleRepo;
