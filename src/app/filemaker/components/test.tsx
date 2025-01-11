'use client';
import { FileMakerDataResponse } from '@/lib/filemaker/FileMakerClient';
import { useState } from 'react';
import { createEntry } from '../action';
import { FMDatabase } from '@/types/filemaker/schema';

const damyData = {
  fieldData: {
    pk: 'abcdefg',
    _fk_owner_pk: 'abcdefg',
    owner_id: 15,
    date: '2025/01/09',
    cow_code: '1234567899',
    owner_name: null,
    cow_number: null,
    cow_id: null,
    label: null,
  },
  portalData: {
    'entry|cows': [
      {
        pk: 'abcdefg',
        _fk_owner_pk: 'abcdefg',
        owner_id: 15,
        cow_code: '1234567899',
        owner_name: null,
        cow_number: null,
        cow_id: null,
        label: null,
      },
    ],
  },
} as FMDatabase['Table']['entry']['create'];
interface Props {
  data: FileMakerDataResponse<
    FMDatabase['Table']['users']['read']['fieldData']
  >;
}

export default function Test({ data }: Props) {
  const [res, setRes] = useState<any>();

  const handleTest = async () => {
    const response = await createEntry(damyData);
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
        <div>
          <ul>
            {/* usersの中身を明示的にしレコードを表示 */}
            {data && <li>{data.response?.data?.[2]?.fieldData.id}</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
