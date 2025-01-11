import { getFileMakerClient } from '@/lib/filemaker/createToken';
import SignOutButton from '../components/signout-button';
import Test from './components/test';

export default async function FileMaker() {
  const client = getFileMakerClient();

  // fieldDataを直接取得
  const userData = await client.get('users').then();

  if (!userData) {
    return <div>データが取得できませんでした。</div>;
  }

  return (
    <div>
      <SignOutButton />
      <Test data={userData} />
    </div>
  );
}
