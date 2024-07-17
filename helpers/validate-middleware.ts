import type { NextRequest } from 'next/server';
import type { Schema } from 'zod';
export default async function validateMiddleware(req: NextRequest, schema: Schema) {
  if (!schema) return;
  const body = await req.json();
  const { error, success, data } = await schema.safeParseAsync(body);

  if (!success) {
    throw `Validation error:  ${error?.errors?.map((x) => `${x.path?.[0]}:${x.message}`).join('; ')}`;
  }

  req.json = () => data;
}
