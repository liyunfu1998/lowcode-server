export function transformInterceptor({
  code,
  message,
  data,
}: {
  code?: number;
  message?: string;
  data?: any;
} = {}) {
  return {
    code: code || 0,
    message: message || 'success',
    data: data || null,
  };
}
