import bcrypt from 'bcryptjs';
import { createAccessToken } from '@/helpers/auth';
import prisma from '@/helpers/prisma';
import type { signUpSchema, signInSchema } from '@/schemas/auth';

async function signUp(data: signUpSchema) {
  const { email, name, password } = data;
  if (
    await prisma.user.findUnique({
      where: {
        email,
      },
    })
  ) {
    const userExistsError = new Error('email ' + email + '账户已存在');
    userExistsError.name = 'UserExistsError';
    throw userExistsError;
  }

  const hashPassword = await bcrypt.hash(password, 12);
  const newUser = { name, email, password: hashPassword };
  const result = await prisma.user.create({
    data: newUser,
  });

  const token = await createAccessToken({ id: result.id });
  return {
    user: {
      name: result.name,
      email: result.email,
    },
    token,
  };
}

async function signIn(data: signInSchema) {
  const { email, password } = data;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error('用户不存在');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('邮箱或密码错误');
  }

  const token = await createAccessToken({ id: user.id });
  return {
    user: {
      name: user.name,
      email: user.email,
    },
    token,
  };
}

const authRepo = {
  signUp,
  signIn,
};
export default authRepo;
