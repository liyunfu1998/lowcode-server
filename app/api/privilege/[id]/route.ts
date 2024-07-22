import { apiHandler, transformInterceptor } from '@/helpers';
import privilegeRepo from '@/helpers/dbRepo/privilege';
import type { NextRequest } from 'next/server';

const update = apiHandler(async (req: NextRequest, { params }: { params: any }) => {
  const { id } = params;
  const body = await req.json();
  const result = await privilegeRepo.update(id, body);
  return transformInterceptor({
    data: result,
  });
});

const remove = apiHandler(async (req: NextRequest, { params }: { params: any }) => {
  const { id } = params;
  const result = await privilegeRepo.remove(id);
  return transformInterceptor({
    data: result,
  });
});

const findById = apiHandler(async (req: NextRequest, { params }: { params: any }) => {
  const { id } = params;
  const result = await privilegeRepo.findById(id);
  return transformInterceptor({
    data: result,
  });
});

export const PATCH = update;
export const DELETE = remove;
export const GET = findById;
