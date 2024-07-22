import { apiHandler, transformInterceptor } from '@/helpers';
import resourceRepo from '@/helpers/dbRepo/resource';
import type { NextRequest } from 'next/server';

const getResource = apiHandler(async (req: NextRequest, { params }: { params: any }) => {
  const { id } = params;
  const result = await resourceRepo.findById(id);
  return transformInterceptor({
    data: result,
  });
});

const removeResource = apiHandler(async (req: NextRequest, { params }: { params: any }) => {
  const { id } = params;
  const result = await resourceRepo.remove(id);
  return transformInterceptor({
    data: result,
  });
});

const updateResource = apiHandler(async (req: NextRequest, { params }: { params: any }) => {
  const { id } = params;
  const body = await req.json();
  const result = await resourceRepo.update(id, body);
  return transformInterceptor({
    data: result,
  });
});

export const GET = getResource;
export const DELETE = removeResource;
export const PATCH = updateResource;
