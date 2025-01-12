'use server';

import { getFileMakerClient } from '@/lib/filemaker/createToken';
import { Suspense } from 'react';
import SignOutButton from '../components/signout-button';
import Test from './components/test';
import Image from 'next/image';
const layoutName = 'blog';

export default async function FileMaker() {
  const client = getFileMakerClient();

  //promise.allで複数のデータを取得
  const [userData, userRangeData, entryData, entryFindData] = await Promise.all(
    [
      client.get(layoutName).then(),
      client.get(layoutName).range(1, 3).then(),
      client.get(layoutName).fields(),
      client
        .get(layoutName)
        .sort({ fieldName: 'id', sortOrder: 'ascend' })
        .then(),
    ]
  );

  // userData の URL を置換する処理
  const modifiedEntryData = entryData.map((item) => {
    return {
      ...item,
      image: item.image?.replace('https://escow.cloud', 'https://example.com'),
    };
  });
  const jsonEntryData = JSON.stringify(modifiedEntryData);
  console.log(jsonEntryData);

  //urlを画像に変換

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='space-y-4'>
        <SignOutButton />
        <Test data={userData} />

        <div className='border rounded-md overflow-x-auto'>
          <div className='prose max-w-none p-4'>
            <h3>FileMaker APIリクエストとレスポンス例</h3>

            <h4>1. 全データ取得</h4>
            <pre className='bg-gray-100 p-2 rounded-md'>
              <code>{`const data = await client.get(${layoutName})`}</code>
            </pre>
            <details>
              <summary>レスポンス</summary>
              <pre className='bg-gray-100 p-2 rounded-md mt-2'>
                <code>{JSON.stringify(userData, null, 2)}</code>
              </pre>
            </details>

            <h4>2. 範囲指定でデータ取得</h4>
            <pre className='bg-gray-100 p-2 rounded-md'>
              <code>{`const data = await client.get(${layoutName}).range(1, 3)`}</code>
            </pre>
            <details>
              <summary>レスポンス</summary>
              <pre className='bg-gray-100 p-2 rounded-md mt-2'>
                <code>{JSON.stringify(userRangeData, null, 2)}</code>
              </pre>
            </details>

            <h4>3. フィールド情報取得</h4>
            <pre className='bg-gray-100 p-2 rounded-md'>
              <code>{`const data = await client.get(${layoutName}).fields()`}</code>
            </pre>
            <details>
              <summary>レスポンス</summary>
              <pre className='bg-gray-100 p-2 rounded-md mt-2'>
                <code>{JSON.stringify(modifiedEntryData, null, 2)}</code>
              </pre>
            </details>
            <Image src={imageDataUrl} alt='image' width={100} height={100} />

            <h4>4. ソート指定で検索</h4>
            <pre className='bg-gray-100 p-2 rounded-md'>
              <code>{`const data = await client.get(${layoutName}).sort({ fieldName: 'cow_code', sortOrder: 'ascend' })`}</code>
            </pre>
            <details>
              <summary>レスポンス</summary>
              <pre className='bg-gray-100 p-2 rounded-md mt-2'>
                <code>{JSON.stringify(entryFindData, null, 2)}</code>
              </pre>
            </details>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
