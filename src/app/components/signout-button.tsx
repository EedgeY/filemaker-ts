'use client';

export default function SignOutButton() {
  const handleSignOut = async () => {
    await fetch('/api/auth/logout');
  };

  return <button onClick={handleSignOut}>ログアウト</button>;
}
