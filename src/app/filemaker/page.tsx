import { getFileMakerClient } from '@/lib/filemaker/createToken';
import SignOutButton from '../components/signout-button';
import Test from './components/test';

export default async function FileMaker() {
  const client = getFileMakerClient();

  //promise.allで複数のデータを取得
  const [userData, userRangeData, entryData, entryFindData] = await Promise.all(
    [
      client.get('users').then(),
      client.get('users').range(1, 3).then(),
      client.get('users').fields(),
      client
        .find('users')
        .eq({ id: '1...50000' as any })
        .fields(),
    ]
  );
  console.log(userRangeData);

  if (!userData) {
    return <div>データが取得できませんでした。</div>;
  }

  return (
    <div>
      <SignOutButton />
      <Test data={userData} />
      <div className='flex border items-center justify-center bg-red-500/50 border-red-500'>
        {userRangeData.response.data?.map((item) => (
          <div key={item.recordId}>
            {item.fieldData.name} {item.fieldData.id}
          </div>
        ))}
      </div>
      <div className='flex border items-center justify-center bg-red-500/50 border-red-500'>
        <pre>{JSON.stringify(entryData, null, 2)}</pre>
      </div>
      <div className='flex border items-center justify-center bg-blue-500/50 border-blue-500'>
        {entryFindData.map((item) => (
          <div key={item.id}>
            {item.name} {item.id}
          </div>
        ))}
      </div>
    </div>
  );
}
