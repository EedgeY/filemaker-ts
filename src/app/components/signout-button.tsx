'use client';

import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const router = useRouter();
  const handleSignOut = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });
    // ログアウト後にリロードまたはリダイレクト
    router.push('/login');
  };

  return <button onClick={handleSignOut}>ログアウト</button>;
}
