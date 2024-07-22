import prisma from '@/helpers/prisma';
import { systemSchemaType } from '@/schemas/system';

const include = {
  creator: {
    select: {
      id: true,
      email: true,
      name: true,
    },
  },
  updator: {
    select: {
      id: true,
      email: true,
      name: true,
    },
  },
};
async function create(system: systemSchemaType) {
  return await prisma.system.create({
    data: system,
    include,
  });
}

async function update(id: string, system: any) {
  return await prisma.system.update({
    where: { id },
    data: system,
    include,
  });
}

async function remove(id: string) {
  return await prisma.system.delete({
    where: { id },
  });
}

async function findById(id: string) {
  return await prisma.system.findUnique({
    where: { id },
    include,
  });
}

async function findByIds(ids: string[]) {
  return await prisma.system.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    include,
  });
}

async function list() {
  return await prisma.system.findMany({
    include,
  });
}

const systemRepo = {
  create,
  update,
  remove,
  findById,
  findByIds,
  list,
};

export default systemRepo;
