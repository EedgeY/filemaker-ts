'use client';
import {
  FileMakerDataResponse,
  FileMakerModifyResponse,
  FileMakerRecord,
} from '@/lib/filemaker/FileMakerClient';
import { FMDatabase } from '@/types/filemaker/schema';
import { useState } from 'react';
import { test } from '../action';

const damyData: FileMakerRecord<
  FMDatabase['Table']['entry']['insert']['fields']
> = {
  fieldData: {
    pk: 'abcdefgdfsfsfsfsd',
    fk_cow_pk: 'abcdefg',
    owner_id: 15,
    date: '2025/01/09',
    cow_code: '1234567899',
  },
};

export default function Test({
  data,
}: {
  data?: FileMakerDataResponse<Record<string, unknown>>;
}) {
  const [res, setRes] = useState<FileMakerModifyResponse>();

  const handleTest = async () => {
    const response = await test(damyData);
    if (response.messages[0].message !== 'OK') {
      console.log(response.messages[0].message);
      alert(response.messages[0].message);
      return;
    }
    setRes(response);
  };
  return (
    <div>
      <button onClick={handleTest}>test</button>
      <div className='flex flex-col gap-4'>
        <pre>{JSON.stringify(res, null, 2)}</pre>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
