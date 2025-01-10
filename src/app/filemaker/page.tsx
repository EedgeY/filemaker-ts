import { getFileMakerClient } from '@/lib/filemaker/createToken';
import SignOutButton from '../components/signout-button';
import Test from './components/test';

export default async function FileMaker() {
  const client = getFileMakerClient();
  const result = await client.get<'users'>('users'); // get メソッドの型引数を指定
  if (!result.response?.data) {
    return <div>データが取得できませんでした。</div>;
  }

  console.log('result', result);

  return (
    <div>
      <SignOutButton />
      <Test data={result.response.data} />
    </div>
  );
}
