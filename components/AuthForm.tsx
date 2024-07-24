'use client';
import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSearchParams, useRouter } from 'next/navigation';
import { z } from 'zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import request from '@/helpers/request';
import { tokenStorage, userStorage } from '@/helpers/storage';
import { toast } from 'sonner';
export enum AUTH_TYPE {
  LOGIN,
  REGISTER,
}
export default function AuthForm(props: any) {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const isRegister = useMemo(() => props.authType === AUTH_TYPE.REGISTER, [props.authType]);
  const formSchema = useMemo(
    () =>
      isRegister
        ? z.object({
            email: z.string().email({
              message: '请输入正确的邮箱地址',
            }),
            password: z.string().min(6, {
              message: '密码长度至少为6位',
            }),
            name: z.string().min(2, {
              message: '名字长度至少为2位',
            }),
          })
        : z.object({
            email: z.string().email({
              message: '请输入正确的邮箱地址',
            }),
            password: z.string().min(6, {
              message: '密码长度至少为6位',
            }),
          }),
    [isRegister],
  );

  // Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // Define a submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      const response = await request.post(
        isRegister ? '/api/auth/signup' : '/api/auth/signin',
        values,
      );
      const result = await response.json();
      if (result?.code === 0) {
        toast.success('登录成功');
        const path = searchParams.get('redirect');
        const userInfo = JSON.stringify(result.data.user);
        tokenStorage.set(result.data.token);
        userStorage.set(userInfo);
        router.replace(path || '/dashboard');
      } else {
        toast.error(result?.message || '登录失败，请稍后再试');
      }
    } catch (err) {
      toast.error('登录失败，请稍后再试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isRegister ? (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="name" placeholder="enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null}

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </form>
    </Form>
  );
}
