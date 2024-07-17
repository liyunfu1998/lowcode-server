import { transformInterceptor, apiHandler } from '@/helpers';
import prisma from '@/helpers/prisma';

const getList = apiHandler(
  async (req: any) => {
    return transformInterceptor({
      data: [
        {
          value: 1,
          label: '全人群',
        },
        {
          value: 2,
          label: '分人群',
        },
      ],
    });
  },
  { isJwt: false, isValidate: false },
);

const addUser = apiHandler(async (req: any) => {
  const result = await req.json();
  const user = await prisma.user.create({
    data: result,
  });

  if (!user) {
    throw new Error('添加用户失败');
  }

  return transformInterceptor({
    data: user,
  });
});

export const GET = getList;
export const POST = addUser;
