import prisma from '@/helpers/prisma';

const include = {
  system: true,
  parent: true,
};
async function create(resource: any) {
  return await prisma.resource.create({
    data: resource,
    include,
  });
}

async function update(id: string, resource: any) {
  return await prisma.resource.update({
    where: { id },
    data: resource,
    include,
  });
}

async function remove(id: string) {
  return await prisma.resource.delete({
    where: { id },
  });
}

async function findById(id: string) {
  return await prisma.resource.findUnique({
    where: { id },
    include,
  });
}

async function paginate({ page, pageSize, ...params }: { page: number; pageSize: number }) {
  const skip = (page - 1) * pageSize;
  const take = pageSize;
  return await prisma.resource.findMany({
    skip,
    take,
    where: {
      ...params,
    },
    include,
  });
}

const resourceRepo = {
  create,
  update,
  remove,
  findById,
  paginate,
};

export default resourceRepo;
