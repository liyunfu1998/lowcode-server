import { apiHandler, transformInterceptor } from '@/helpers';
import systemRepo from '@/helpers/dbRepo/system';
import type { NextRequest } from 'next/server';

const getSystem = apiHandler(async (req: NextRequest, { params }: { params: any }) => {
  const { id } = params;
  const result = await systemRepo.findById(id);
  return transformInterceptor({
    data: result,
  });
});

const updateSystem = apiHandler(async (req: NextRequest, { params }: { params: any }) => {
  const { id } = params;
  const userId = await req.headers.get('userId');
  const body = await req.json();

  const result = await systemRepo.update(id, {
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

const removeSystem = apiHandler(async (req: NextRequest, { params }: { params: any }) => {
  const { id } = params;
  const result = await systemRepo.remove(id);
  return transformInterceptor({
    data: result,
  });
});

export const GET = getSystem;
export const PATCH = updateSystem;
export const DELETE = removeSystem;
