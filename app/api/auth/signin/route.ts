import { apiHandler, transformInterceptor } from '@/helpers';
import authRepo from '@/helpers/dbRepo/auth';
import { signInSchema } from '@/schemas/auth';
import type { NextRequest } from 'next/server';

const signIn = apiHandler(
  async (req: NextRequest) => {
    const body = await req.json();
    const result = await authRepo.signIn(body);

    return transformInterceptor({
      data: result,
    });
  },
  {
    schema: signInSchema,
  },
);

export const POST = signIn;
