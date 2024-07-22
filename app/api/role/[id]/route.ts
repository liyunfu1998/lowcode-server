import { apiHandler, transformInterceptor } from '@/helpers';
import roleRepo from '@/helpers/dbRepo/role';
import type { NextRequest } from 'next/server';

const update = apiHandler(async (req: NextRequest, { params }: { params: any }) => {
  const { id } = params;
  const body = await req.json();
  const userId = await req.headers.get('userId');

  const result = await roleRepo.update(id, {
    ...body,
    updator: {
      connect: {
        id: userId,
      },
    },
  });
  return transformInterceptor({
    data: result,
  });
});

const remove = apiHandler(async (req: NextRequest, { params }: { params: any }) => {
  const { id } = params;
  const result = await roleRepo.remove(id);
  return transformInterceptor({
    data: result,
  });
});

const findById = apiHandler(async (req: NextRequest, { params }: { params: any }) => {
  const { id } = params;
  const result = await roleRepo.findById(id);
  return transformInterceptor({
    data: result,
  });
});

export const PATCH = update;
export const DELETE = remove;
export const GET = findById;
