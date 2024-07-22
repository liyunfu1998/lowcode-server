import { z } from 'zod';
import { STATUS } from '@/helpers/constants';

export const systemSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2).optional(),
  status: z.enum([STATUS.DISABLED, STATUS.ENABLED]).optional(),
  creatorId: z.string(),
  updatorId: z.any().optional(),
});

export type systemSchemaType = z.infer<typeof systemSchema>;
