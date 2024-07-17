import authRepo from '@/helpers/dbRepo/auth';
import { apiHandler, transformInterceptor } from '@/helpers';
import type { NextRequest } from 'next/server';
import { signUpSchema } from '@/schemas/auth';

const signUp = apiHandler(
  async (req: NextRequest) => {
    const body = await req.json();
    const result = await authRepo.signUp(body);

    return transformInterceptor({
      data: result,
    });
  },
  {
    schema: signUpSchema,
  },
);

export const POST = signUp;
