import { transformInterceptor, apiHandler } from '@/helpers';

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

export const GET = getList;
