import React from 'react';
import { getFileMakerClient } from '@/lib/filemaker/createToken';
import Test from './components/test';
import SignOutButton from '../components/signout-button';
import { FileMakerRecord } from '@/lib/filemaker/FileMakerClient';

export default async function FileMaker() {
  const client = getFileMakerClient();
  const result = await client.get('users');
  if (!result.response?.data) {
    return <div>データが取得できませんでした。</div>;
  }
  const formattedData = result.response.data.map((record: FileMakerRecord) => ({
    ...record,
    fieldData: {
      ...record.fieldData,
      id: Number(record.fieldData.id),
    },
  }));
  console.log('result', result);

  return (
    <div>
      <SignOutButton />
      <Test data={formattedData} />
    </div>
  );
}
