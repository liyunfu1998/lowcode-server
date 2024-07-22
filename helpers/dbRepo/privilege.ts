import prisma from '@/helpers/prisma';

async function create(privilege: any) {
  return await prisma.privilege.create({
    data: privilege,
  });
}

async function update(id: string, privilege: any) {
  return await prisma.privilege.update({
    where: { id },
    data: privilege,
  });
}

async function remove(id: string) {
  return await prisma.privilege.delete({
    where: { id },
  });
}

async function findById(id: string) {
  return await prisma.privilege.findUnique({
    where: { id },
  });
}

async function paginate({ page, pageSize, ...params }: { page: number; pageSize: number }) {
  const skip = (page - 1) * pageSize;
  const take = pageSize;
  return await prisma.privilege.findMany({
    skip,
    take,
    where: {
      ...params,
    },
  });
}

const privilegeRepo = {
  create,
  update,
  remove,
  findById,
  paginate,
};

export default privilegeRepo;
