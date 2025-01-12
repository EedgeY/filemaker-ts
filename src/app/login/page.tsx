'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    console.log('handleSubmit が呼び出されました');
    e.preventDefault();
    setError('');

    if (isLogin) {
      try {
        console.log('fetch 前:', { username, password });
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        console.log('fetch 後:', response);

        const data = await response.json();

        console.log(data);

        if (!data.success) {
          throw new Error(data.error);
        }

        router.push('/filemaker');
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : isLogin
            ? 'ログインに失敗しました'
            : '登録に失敗しました'
        );
      }
    } else {
      //signup
      console.log('signup');

      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        console.log(data);
        if (!data.success) {
          throw new Error(data.error);
        }
        router.push('/filemaker');
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : isLogin
            ? 'ログインに失敗しました'
            : '登録に失敗しました'
        );
      }
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow'>
        <div>
          <h2 className='text-center text-3xl font-bold'>
            {isLogin ? 'ログイン' : '新規登録'}
          </h2>
          {error && (
            <div className='mt-4 p-3 bg-red-100 text-red-700 rounded'>
              {error}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <input
                type='text'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='ユーザー名'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type='password'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='パスワード'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              {isLogin ? 'ログイン' : '登録'}
            </button>
          </div>

          <div className='text-center'>
            <button
              type='button'
              className='text-indigo-600 hover:text-indigo-500'
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? '新規登録はこちら' : 'ログインはこちら'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
